import { type User, Photo, ROLE, type CreateUser, type UpdateUser } from '@/types';
import { decodeToken } from '@/utils/jwt';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class UserServices {
  async getAllUsers(
    page: number,
    pageSize = 5,
    isActive = true,
  ): Promise<{ users: User[]; total: number }> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const users = (await prisma.user.findMany()) || [];

    let paginatedUsers = users.slice(startIndex, endIndex);
    const total = users.length;
    if (isActive) {
      paginatedUsers = paginatedUsers.filter((user) => user.isActive);
    }

    return { users: paginatedUsers, total };
  }

  async createUser(user: CreateUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    try {
      const newUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          password: hashedPassword,
          isActive: user.isActive ?? true,
          role: user.role ?? ROLE.USER,
        },
      });
      return newUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw error;
        }
      }
      throw new Error('An error occurred while creating the user');
    }
  }
  async findUniqueUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async deleteUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.delete({
      where: { email },
    });
    return user;
  }

  async updateUserByEmail(email: string, data: UpdateUser): Promise<User | null> {
    const user = await prisma.user.update({
      where: { email },
      data,
    });
    return user;
  }
}

export default new UserServices();
