import { PrismaClient } from '@prisma/client';
import { StorageService } from '@/utils/storage-services';

const prisma = new PrismaClient();

export class PhotoService {
  private storageService: StorageService;

  constructor() {
    this.storageService = new StorageService();
  }

  async getAllPhotos(page: number, pageSize: number, email: string) {
    const skip = (page - 1) * pageSize;
    const where = email ? { user: { email: email } } : {};

    const [photos, total] = await prisma.$transaction([
      prisma.photo.findMany({
        where,
        skip,
        take: pageSize,
      }),
      prisma.photo.count({ where }),
    ]);

    return { photos, total };
  }

  async getPhotoById(id: number) {
    const photo = await prisma.photo.findUnique({
      where: { id },
    });

    return photo;
  }

  async deletePhotoById(id: number) {
    const photo = await prisma.photo.delete({
      where: { id },
    });

    return photo;
  }

  async createPhoto(fileBuffer: Buffer, fileName: string, email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new Error('User not found');
      }
      const fileUrl = await this.storageService.uploadFile(fileName, fileBuffer);
      const newPhoto = await prisma.photo.create({
        data: {
          user_id: user.id,
          url: fileUrl,
        },
      });

      return newPhoto;
    } catch (error) {
      console.error('Error creating photo:', error);
      throw new Error('Failed to create photo');
    }
  }

  async insertPhotoIntoAlbum(photoId: number, albumId: number, email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const album = await prisma.album.findFirst({
        where: { id: albumId, user_id: user.id },
      });

      if (!album) {
        throw new Error('Album not found or user does not have access to this album');
      }

      const photo = await prisma.photo.update({
        where: { id: photoId },
        data: { album_id: albumId },
      });

      return photo;
    } catch (error) {
      console.error('Error inserting photo into album:', error);
      throw new Error('Failed to insert photo into album');
    }
  }
}
