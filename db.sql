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

