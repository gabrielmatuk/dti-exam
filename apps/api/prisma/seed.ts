import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      name: 'User Two',
      password: 'password456',
      role: 'user',
      photos: {
        create: [{ url: 'https://example.com/photo3.jpg' }],
      },
    },
  });

  const testeUser = await prisma.user.create({
    data: {
      email: 'test@domain.com',
      name: 'Test User',
      password: 'password123',
      role: 'user'
    }
  }
  )

  const user3 = await prisma.user.create({
    data: {
      email: 'user3@example.com',
      name: null,
      password: 'password789',
      role: 'user',
    },
  });


  const user4 = await prisma.user.create({
    data: {
      email: 'gabriel@teste.com',
      name: 'Gabriel -TESTE',
      password: 'senhaaaa',
      role: 'user',
    }
  })
  console.log('Users seeded:', user2, testeUser, user3, user4);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
