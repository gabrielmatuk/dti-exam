import { Hono } from 'hono';
import LoginController from '../controllers/login.controller';

const authRoute = new Hono();

authRoute.post('/login', LoginController.login);

export default authRoute;