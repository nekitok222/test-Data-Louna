-- Таблица пользователей
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(50) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       balance FLOAT DEFAULT 0
);

-- Таблица товаров
CREATE TABLE products (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(100) NOT NULL,
                          price FLOAT NOT NULL,
                          tradable BOOLEAN DEFAULT FALSE
);

-- Таблица покупок
CREATE TABLE purchases (
                           id SERIAL PRIMARY KEY,
                           user_id INT REFERENCES users(id),
                           product_id INT REFERENCES products(id),
                           purchased_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO products (name, price, tradable)
VALUES
    ('Sticker | dennis | MLG Columbus 2016', 3.73, TRUE),
    ('Sticker | dephh (Gold) | Katowice 2019', 19.94, FALSE),
    ('AK-47 | Redline (Field-Tested)', 15.50, TRUE),
    ('AWP | Dragon Lore (Factory New)', 1500.00, TRUE),
    ('Sticker | s1mple (Holo) | Berlin 2019', 50.00, FALSE);

