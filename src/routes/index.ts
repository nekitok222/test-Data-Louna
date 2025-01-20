import { FastifyInstance } from 'fastify';
import { userRoutes } from './users';
import { productRoutes } from './products';
import { purchaseRoutes } from './purchases';

export const routes = (app: FastifyInstance) => {
    userRoutes(app);
    productRoutes(app);
    purchaseRoutes(app);
};
