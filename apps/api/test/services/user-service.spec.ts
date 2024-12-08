import { PrismaClient } from '@prisma/client';

import { UserServices } from '../../src/services/user.services';

const prisma = new PrismaClient();
const userServices = new UserServices();

describe('UserServices', () => {
  let createdUserId: number;
  let createdUserEmail: string;
  afterAll(async () => {
    if (createdUserId) {
      await prisma.user.delete({
        where: { id: createdUserId },
      });
    }
  });

  it('should create a user in the database', async () => {
    const mockUser = {
      email: 'john@doe.com.br',
      name: 'John Doe',
      password: 'password123',
      isActive: true,
      role: 'user',

    }

    const user = await userServices.createUser(
      mockUser
    );
    createdUserId = user.id;
    createdUserEmail = user.email;
    const createdUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    expect(createdUser).toBeTruthy();
  });

  it('should return all users', async () => {
    const users = await userServices.getAllUsers(1, 5, true);

    expect(users).toBeTruthy();
  })

  it('should delete a user from the database', async () => {
    const mockUser = {
      email: 'john@doe-fordelete.com.br',
      name: 'John Doe',
      password: 'password123',
      isActive: true,
      role: 'user',
    }
    let email = '';
    if (!createdUserEmail) {

      const user = await userServices.createUser(
        mockUser
      );
      email = user.email;
    }

    const deletedUser = await userServices.deleteUserByEmail(email || createdUserEmail);
    expect(deletedUser).toBeTruthy();
  }
  )

  it('should update a user in the database', async () => {
    const mockUser = {
      email: 'john@doe-forupdate.com.br',
      name: 'John Doe',
      password: 'password123',
      isActive: true,
      role: 'user',
    }

    const user = await userServices.createUser(
      mockUser
    );

    const updatedUser = await userServices.updateUserByEmail(user.email, { name: 'John Doe Updated' });
    createdUserId = user.id;
    expect(updatedUser).toBeTruthy();
  })
});
