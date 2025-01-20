import Fastify from 'fastify';
import { routes } from './routes';
import { db } from './db';
import dotenv from 'dotenv';
import { connectRedis } from './db/redis';

// Загружаем переменные окружения
dotenv.config();
const result = dotenv.config();
if (result.error) {
    console.error('Error loading .env file:', result.error);
} else {
    console.log('.env loaded successfully:', result.parsed);
}
const app = Fastify();

// Проверка подключений
db.connect().catch((err) => console.error('Postgres connection error:', err));


(async () => {
    await connectRedis();
})();

// Регистрация маршрутов
routes(app);

app.listen({ port: 3000 }, () => {
    console.log('Server is running on http://localhost:3000');
});
