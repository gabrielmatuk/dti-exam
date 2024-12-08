import { TokenPayload } from '@/types';
import { sign, verify, decode } from 'hono/jwt'
const SECRET = process.env.SECRET || 'secret';

export const generateToken = async (payload: object) => {
  return await sign({
    sub: payload, exp: Math.floor(Date.now() / 1000) + 60 * 900,
  }, SECRET);
};

export const verifyToken = (token: string) => {
  try {
    return verify(token, SECRET)
  } catch (error) {
    throw error
  }
}

export const decodeToken = (token: string): TokenPayload => {
  try {
    const { payload } = decode(token)
    return payload as TokenPayload;
  } catch (error) {
    throw error
  }

};
