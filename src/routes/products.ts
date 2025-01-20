import { FastifyInstance } from 'fastify';
import { productController } from '../controllers/productController';

export const productRoutes = (app: FastifyInstance) => {
    app.get('/products', productController.getProducts);
};
