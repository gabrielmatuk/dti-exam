import { decodeToken } from './jwt';
import { Context } from 'hono';

export function getEmailByJwt(c: Context): string {
  const jwt = String(c.req.header('Authorization')).replace('Bearer ', '');
  return decodeToken(jwt).sub.email;
}