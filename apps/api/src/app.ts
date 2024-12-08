import { Hono } from 'hono';
import type { Context } from 'hono'

import userRoutes from './routes/user.routes';
import authRoute from './routes/login.routes';
import photoRoutes from './routes/photo.routes';
import albumRoutes from './routes/album.routes';

const app = new Hono();

app.route('api/v1', userRoutes);
app.route('api/v1', authRoute);
app.route('api/v1', photoRoutes);
app.route('api/v1', albumRoutes);

app.all('*', (c: Context) => c.json({ message: 'Not found' }, 404));
export default app;