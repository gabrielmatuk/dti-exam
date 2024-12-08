import { Context } from 'hono';
import { AlbumService } from '@/services/album.services';
import { getEmailByJwt } from '@/utils/get-email-by-jwt'

const albumService = new AlbumService();

class AlbumController {

  public async listAlbums(c: Context) {
    try {
      const page = Number(c.req.query('page')) || 1;
      const pageSize = Number(c.req.query('pageSize')) || 5;
      const email = getEmailByJwt(c);

      const { albums, total } = await albumService.getAllAlbums(email, page, pageSize);

      return c.json({ albums, count: albums.length, total, page, pageSize, totalPages: Math.ceil(total / pageSize) });
    } catch (err) {
      console.log(err);
      return c.json({ message: 'Failed to list albums' }, 400);
    }
  }


  public async getAlbumById(c: Context) {
    try {
      const albumId = Number(c.req.param('id'));
      const email = getEmailByJwt(c);

      if (isNaN(albumId)) {
        return c.json({ message: 'Invalid album ID' }, 400);
      }

      const album = await albumService.getAlbumById(albumId, email);

      return c.json({ album });
    } catch (err) {
      console.log(err);
      return c.json({ message: 'Failed to retrieve album' }, 400);
    }
  }

  public async createAlbum(c: Context) {
    try {
      const { name } = await c.req.json();
      const email = getEmailByJwt(c);

      if (!name) {
        return c.json({ message: 'Name and userEmail are required' }, 400);
      }

      const newAlbum = await albumService.createAlbum(name, email);

      return c.json({ newAlbum }, 201);
    } catch (err) {
      console.log(err);
      return c.json({ message: 'Failed to create album' }, 400);
    }
  }

  public async deleteAlbumById(c: Context) {
    try {
      const albumId = Number(c.req.param('id'));
      const email = getEmailByJwt(c);

      if (isNaN(albumId)) {
        return c.json({ message: 'Invalid album ID' }, 400);
      }

      await albumService.deleteAlbumById(albumId, email);

      return c.json({}, 200);
    } catch (err) {
      console.log(err);
      return c.json({ message: 'Failed to delete album' }, 400);
    }
  }
}


export default new AlbumController