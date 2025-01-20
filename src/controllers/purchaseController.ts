import { FastifyRequest, FastifyReply } from 'fastify';
import { purchaseService } from '../services/purchaseService';

export const purchaseController = {
    async makePurchase(req: FastifyRequest, reply: FastifyReply) {
        const { userId, productId } = req.body as { userId: number; productId: number };
        const result = await purchaseService.makePurchase(userId, productId);

        if (!result.success) {
            return reply.status(400).send(result.error);
        }

        reply.send(result.data);
    },
};
