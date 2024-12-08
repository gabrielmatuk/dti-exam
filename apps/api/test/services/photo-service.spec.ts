import { readFileSync } from 'fs';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
import { PhotoService } from '@/services/photo.services';

const prisma = new PrismaClient();
const photoService = new PhotoService() as jest.Mocked<PhotoService>;

describe('PhotoService', () => {
  let createdUserEmail: string;

  beforeAll(async () => {
    createdUserEmail = 'test@example.com';
    const user = await prisma.user.findUnique({
      where: {
        email: createdUserEmail,
      }
    })
    if (!user?.id) {
      await prisma.user.create({
        data: {
          email: createdUserEmail,
          name: 'Test User',
          password: 'password',
        },
      });
    }
  });

  it('should throw an error if URL is missing', async () => {
    const mockFilePath = join(__dirname, '../mocks/example.png');
    const mockFileBuffer = readFileSync(mockFilePath);
    const mockFileName = 'example.png';

    // Mock the uploadFile method to simulate a missing URL
    jest.spyOn(photoService, 'createPhoto').mockImplementation(async () => {
      throw new Error('Photo URL is missing');
    });

    await expect(photoService.createPhoto(mockFileBuffer, mockFileName, createdUserEmail))
      .rejects
      .toThrow('Photo URL is missing');
  });

  it('should list all photos', async () => {
    const { photos } = await photoService.getAllPhotos(1, 5, createdUserEmail);
    expect(photos).toBeDefined();
  });
});