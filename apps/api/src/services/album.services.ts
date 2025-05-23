import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AlbumService {
  async getAllAlbums(email: string, page = 1, pageSize = 5) {
    const skip = (page - 1) * pageSize;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const [albums, total] = await prisma.$transaction([
      prisma.album.findMany({
        skip,
        take: pageSize,
        include: { photos: true },
      }),
      prisma.album.count({}),
    ]);

    return { albums, total };
  }

  async getAlbumById(id: number, email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const album = await prisma.album.findFirst({
      where: { id },
      include: { photos: true },
    });

    if (!album) {
      throw new Error('Album not found');
    }

    return album;
  }

  async createAlbum(name: string, email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const newAlbum = await prisma.album.create({
      data: {
        name,
        user_id: user.id, //This is obligatory to create an album.
      },
    });

    return newAlbum;
  }

  async deleteAlbumById(id: number, email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const album = await prisma.album.findFirst({
      where: { id },
    });

    if (!album) {
      throw new Error('Album not found');
    }

    const deletedAlbum = await prisma.album.delete({
      where: { id },
    });

    return deletedAlbum;
  }
}

export const albumService = new AlbumService();
