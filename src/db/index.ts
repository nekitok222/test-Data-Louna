import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config(); // Загружаем .env

const pgp = pgPromise();

console.log('Postgres Config:', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

export const db = pgp({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || 'testdb',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
});
