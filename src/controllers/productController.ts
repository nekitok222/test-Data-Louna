import { FastifyRequest, FastifyReply } from 'fastify';
import { productService } from '../services/productService';

export const productController = {
    async getProducts(req: FastifyRequest, reply: FastifyReply) {
        try {
            const products = await productService.getProducts();
            reply.send(products);
        } catch (e) {
            console.error(e);
        }
    },
};
