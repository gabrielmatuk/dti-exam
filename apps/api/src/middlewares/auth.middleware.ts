import type { Context, MiddlewareHandler } from 'hono';
import { verifyToken } from '../utils/jwt';

export const authMiddleware: MiddlewareHandler = async (ctx: Context, next) => {
  const authHeader = ctx.req.header('Authorization');
  if (!authHeader) {
    return ctx.json(
      { message: 'Unathorized - Check your credentials, check the /login path!' },
      401,
    );
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = verifyToken(token);
    ctx.set('login', decoded);
    await next();
  } catch (error) {
    return ctx.json({ message: 'Token invalid or expired' }, 403);
  }
};
