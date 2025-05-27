CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL
);

INSERT INTO products (name, price, image_url) VALUES
('Помада', 499.99, 'https://storage.yandexcloud.net/cdn-prod.viled.kz/v3/original/276879Xt2b0.jpeg'),
('Тональный крем', 999.99, 'https://french-house.kz/upload/iblock/71c/6j50gejlkrrof0kabfccseu3de54morv.jpg');

INSERT INTO products (name, price, image_url) VALUES
('Тушь для ресниц', 749.99, 'https://cosmart.kz/upload/dev2fun.imagecompress/webp/iblock/bfe/0sxrc0m6yl8rq1nyk3smcn60yhl7jasu.webp'),
('Пудра компактная', 899.99, 'https://static.markformelle.kz/site/master/catalog/607135/desktop/card/6722163.webp');

ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

INSERT INTO users (name, email, password)
VALUES (
    'admin',
    'admin@example.com	',
    '$2b$12$KDm74/Rmp8s8N7q0EkU9h.Gk8r7n1X7AXT1XMUogihrnaYl.HGdkO'
);

ALTER TABLE products ADD COLUMN category VARCHAR(50);

UPDATE products SET category = 'makeup' WHERE id = 1;
UPDATE products SET category = 'makeup' WHERE id = 3;
UPDATE products SET category = 'face' WHERE id = 2;
UPDATE products SET category = 'face' WHERE id = 4;