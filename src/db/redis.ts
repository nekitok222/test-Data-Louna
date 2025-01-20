import { createClient } from 'redis';

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
    },
    password: process.env.REDIS_PASSWORD || undefined,
});

let isConnected = false;

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

export const connectRedis = async () => {
    if (!isConnected) {
        await redisClient.connect();
        isConnected = true;
        console.log('Connected to Redis');
    }
};

export default redisClient;
