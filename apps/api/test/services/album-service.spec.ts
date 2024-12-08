import { PrismaClient } from '@prisma/client';
import { AlbumService } from '../../src/services/album.services';

const prisma = new PrismaClient();
describe('AlbumService', () => {

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

  it('should throw an error if album is not found', async () => {
    const albumService = new AlbumService();
    const albumId = 9999;
    await expect(albumService.getAlbumById(albumId, createdUserEmail))
      .rejects
      .toThrow('Album not found');
  });

  it('should create an album', async () => {
    const albumService = new AlbumService();
    const albumName = 'Test Album';
    const newAlbum = await albumService.createAlbum(albumName, createdUserEmail);
    expect(newAlbum).toBeTruthy();
  });

  it('should delete an album', async () => {
    const albumService = new AlbumService();
    const albumName = 'Test Album';
    const newAlbum = await albumService.createAlbum(albumName, createdUserEmail);
    const deletedAlbum = await albumService.deleteAlbumById(newAlbum.id, createdUserEmail);
    expect(deletedAlbum).toBeTruthy();

  })

});