import type { Context } from 'hono';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserServices } from '../services/user.services';
import { validate } from 'class-validator';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateUserDto } from '@/dtos/update-user.dto';

const usersService = new UserServices();

class UserController {
  public async listUsers(c: Context) {
    try {
      const page = Number(c.req.query('page')) || 1;
      const pageSize = Number(c.req.query('pageSize')) || 5;
      const isActive = !!c.req.query('isActive');

      const { users, total } = await usersService.getAllUsers(page, pageSize, isActive);

      return c.json({
        users,
        count: users.length,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      });
    } catch (err) {
      console.log(err);
    }
  }

  public async createUser(c: Context) {
    try {
      const body = await c.req.json();
      const userDto = plainToInstance(CreateUserDto, body);
      const errors = await validate(userDto);
      if (errors.length > 0) {
        return c.json({ errors }, 400);
      }
      const newUser = await usersService.createUser(userDto);
      return c.json({ newUser }, 201);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return c.json({ message: 'Email already in use' }, 400);
        }
      }
      console.log(err);
    }
  }

  public async deleteUser(c: Context) {
    try {
      const email = c.req.param('email');
      await usersService.deleteUserByEmail(email);
      return c.json({}, 204);
    } catch (err) {
      console.log(err);
      return c.json({ message: 'Failed to delete user' }, 400);
    }
  }

  public async updateUser(c: Context) {
    try {
      const email = c.req.param('email');
      const body = await c.req.json();
      const sanitazedDto = plainToInstance(UpdateUserDto, body);
      const userDto = plainToInstance(UpdateUserDto, sanitazedDto);
      userDto.email = email ?? userDto.email;
      const updatedUser = await usersService.updateUserByEmail(email, userDto);
      return c.json({ updatedUser }, 200);
    } catch (err) {
      console.log(err);
      return c.json({ message: 'Failed to update user' }, 400);
    }
  }

  public async getUserByEmail(c: Context) {
    try {
      const email = c.req.param('email');
      const user = await usersService.getUserByEmail(email);
      return c.json({ user }, 200);
    } catch (err) {
      console.log(err);
      return c.json({ message: 'Failed to retrieve user' }, 400);
    }
  }
}

export default new UserController();
