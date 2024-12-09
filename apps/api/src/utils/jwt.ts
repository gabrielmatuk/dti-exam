import type { TokenPayload } from '@/types';
import { sign, verify, decode } from 'hono/jwt';
const SECRET = process.env.SECRET || 'secret';

export const generateToken = async (payload: object) => {
  return await sign(
    {
      sub: payload,
      exp: Math.floor(Date.now() / 1000) + 60 * 900,
    },
    SECRET,
  );
};

export const verifyToken = (token: string) => {
  return verify(token, SECRET);
};

export const decodeToken = (token: string): TokenPayload => {
  const { payload } = decode(token);
  return payload as TokenPayload;
};
