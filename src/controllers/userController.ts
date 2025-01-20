import { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '../services/userService';

export const userController = {
    async register(req: FastifyRequest, reply: FastifyReply) {
        const { username, password } = req.body as { username: string; password: string };
        const result = await userService.register(username, password);
        if (!result.success) {
            return reply.status(400).send(result.error);
        }
        reply.send({ message: 'User registered' });
    },

    async login(req: FastifyRequest, reply: FastifyReply) {
        const { username, password } = req.body as { username: string; password: string };
        const result = await userService.login(username, password);
        if (!result.success) {
            return reply.status(401).send(result.error);
        }
        reply.send(result.data);
    },

    async changePassword(req: FastifyRequest, reply: FastifyReply) {
        const { username, oldPassword, newPassword } = req.body as { username: string; oldPassword: string; newPassword: string };
        const result = await userService.changePassword(username, oldPassword, newPassword);
        if (!result.success) {
            return reply.status(400).send(result.error);
        }
        reply.send({ message: 'Password updated' });
    },
};
