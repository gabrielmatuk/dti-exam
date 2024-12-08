import { PrismaClient } from '@prisma/client';
import { PhotoService } from '../../src/services/photo.services';
import { StorageService } from '../../src/utils/storage-services';

jest.mock('../../src/utils/storage-services');

const prisma = new PrismaClient();
const photoService = new PhotoService();
const storageService = new StorageService();

describe('PhotoService', () => {
  let createdPhotoId: number;
  let createdUserEmail: string = 'testuser@example.com';

  beforeAll(async () => {
    const user = await prisma.user.findUnique({
      where: { email: createdUserEmail },
    })
    if (!user?.id) {
      await prisma.user.create({
        data: {
          email: createdUserEmail,
          name: 'Test User',
          password: 'password123',
        },
      });
    }

  });

  it('should create a photo in the database', async () => {
    const mockFileBuffer = Buffer.from('mock file content');
    const mockFileName = 'mockfile.jpg';
    (storageService.uploadFile as jest.Mock).mockResolvedValue('mockfileurl.com/mockfile.jpg');

    const photo = await photoService.createPhoto(mockFileBuffer, mockFileName, createdUserEmail);
    createdPhotoId = photo.id;

    const createdPhoto = await prisma.photo.findUnique({
      where: { id: photo.id },
    });

    expect(createdPhoto).toBeTruthy();
    expect(createdPhoto?.url).toBe('mockfileurl.com/mockfile.jpg');
  });

  // it('should return a photo by id', async () => {
  //   const photo = await photoService.getPhotoById(createdPhotoId);

  //   expect(photo).toBeTruthy();
  //   expect(photo?.id).toBe(createdPhotoId);
  // });

  // it('should return all photos', async () => {
  //   const { photos, total } = await photoService.getAllPhotos(1, 5, createdUserEmail);

  //   expect(photos).toBeTruthy();
  //   expect(total).toBeGreaterThanOrEqual(1);
  // });

  // it('should delete a photo from the database', async () => {
  //   const deletedPhoto = await photoService.deletePhotoById(createdPhotoId);

  //   expect(deletedPhoto).toBeTruthy();

  //   const photoAfterDeletion = await prisma.photo.findUnique({
  //     where: { id: createdPhotoId },
  //   });

  //   expect(photoAfterDeletion).toBeNull();
  // });

  // it('should insert a photo into an album', async () => {
  //   const album = await prisma.album.create({
  //     data: {
  //       name: 'Test Album',
  //       user_id: (await prisma.user.findUnique({ where: { email: createdUserEmail } }))!.id,
  //     },
  //   });

  //   const mockFileBuffer = Buffer.from('mock file content');
  //   const mockFileName = 'mockfile.jpg';
  //   (storageService.uploadFile as jest.Mock).mockResolvedValue('mockfileurl.com/mockfile.jpg');

  //   const photo = await photoService.createPhoto(mockFileBuffer, mockFileName, createdUserEmail);
  //   createdPhotoId = photo.id;

  //   const updatedPhoto = await photoService.insertPhotoIntoAlbum(photo.id, album.id, createdUserEmail);

  //   expect(updatedPhoto).toBeTruthy();
  //   expect(updatedPhoto.album_id).toBe(album.id);
  // });
});