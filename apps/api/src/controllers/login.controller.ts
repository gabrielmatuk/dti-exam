import { Context } from 'hono';
import { generateToken } from '@/utils/jwt';
import { LoginDto } from '@/dtos/login.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { loginValidatorSchema } from '@/validators/login-validator';
import loginServices from '@/services/login.services';

class LoginController {
  public async login(c: Context) {
    try {
      const jsonInputed = await c.req.json();
      const body = loginValidatorSchema.safeParse(jsonInputed);

      if (!body.success) {
        return c.json({ errors: body.error.errors }, 422);
      }

      const loginDto = plainToInstance(LoginDto, body.data);
      const errors = await validate(loginDto);

      if (errors.length > 0) {
        return c.json({ errors }, 400);
      }

      const isValidPassword = await loginServices.isValidUserPassword(loginDto.email, loginDto.password);
      if (!isValidPassword) {
        return c.json({ message: 'Invalid email or password' }, 401);
      }

      const payload = await generateToken({ email: loginDto.email });
      return c.json({ token: payload }, 200);

    } catch (err) {
      console.log(err);
      return c.json({ message: 'Internal server error' }, 500);
    }
  }
}

export default new LoginController();
