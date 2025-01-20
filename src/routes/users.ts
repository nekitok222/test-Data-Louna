import { FastifyInstance } from 'fastify';
import { userController } from '../controllers/userController';

export const userRoutes = (app: FastifyInstance) => {
    app.post('/register', userController.register);
    app.post('/login', userController.login);
    app.post('/change-password', userController.changePassword);
};
