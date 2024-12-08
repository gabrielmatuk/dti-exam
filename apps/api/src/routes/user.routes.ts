import { Hono } from 'hono';
import UserController from '@/controllers/user.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
const userRoutes = new Hono();

userRoutes.get('/users', authMiddleware, UserController.listUsers);
userRoutes.post('/user', UserController.createUser);
userRoutes.delete('/user/:email', authMiddleware, UserController.deleteUser);
userRoutes.put('/user/:email', authMiddleware, UserController.updateUser);

export default userRoutes;
