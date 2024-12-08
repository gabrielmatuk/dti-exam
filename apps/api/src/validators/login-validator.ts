import { z } from 'zod';

export const loginValidatorSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});