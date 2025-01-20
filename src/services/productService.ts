import axios from 'axios';
import redisClient from '../db/redis';

export const productService = {
    async getProducts() {
        try {
            const cache = await redisClient.get('products');
            if (cache) {
                return JSON.parse(cache);
            }

            const { data } = await axios.get('https://api.skinport.com/v1/items');

            // Обрабатываем данные
            const products = data.map((item: any) => {
                const isTradable = item.min_price !== null; // Этот пункт мне остался неясен. В ответе что так что так не отображается торгуют ли этим или нет.
                return {
                    name: item.market_hash_name,
                    tradable: isTradable ? item.min_price : null,
                    nonTradable: isTradable,
                    quantity: item.quantity,
                };
            });

            await redisClient.set('products', JSON.stringify(products), { EX: 3600 }); // 1 час
            return products;
        } catch (e) {
            console.error('Ошибка при получении продуктов:', e);
            throw e;
        }
    },
};
