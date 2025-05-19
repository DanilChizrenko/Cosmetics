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
('Помада', 499.99, 'https://example.com/lipstick.jpg'),
('Тональный крем', 999.99, 'https://example.com/foundation.jpg');

SELECT json_agg(products) FROM products;
