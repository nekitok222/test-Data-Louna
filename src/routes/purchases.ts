import { FastifyInstance } from 'fastify';
import { purchaseController } from '../controllers/purchaseController';

export const purchaseRoutes = (app: FastifyInstance) => {
    app.post('/purchase', purchaseController.makePurchase);
};
