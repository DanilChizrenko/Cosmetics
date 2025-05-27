const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('.'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1',
    port: 5432
});

app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

// Регистрация
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('Все поля обязательны');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashedPassword]
        );
        res.status(201).send('Пользователь зарегистрирован');
    } catch (err) {
        console.error(err);
        if (err.code === '23505') {
            res.status(409).send('Пользователь с таким email уже существует');
        } else {
            res.status(500).send('Ошибка сервера');
        }
    }
});

// Вход
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).send('Неверный email или пароль');
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).send('Неверный email или пароль');
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});