import { Hono } from 'hono';
import AlbumController from '@/controllers/album.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';

const albumRoute = new Hono();

albumRoute.post('/user/album', authMiddleware, AlbumController.createAlbum);
albumRoute.get('/user/albums', authMiddleware, AlbumController.listAlbums);
albumRoute.get('/user/album/:id', authMiddleware, AlbumController.getAlbumById);
albumRoute.delete('/user/album/:id', authMiddleware, AlbumController.deleteAlbumById);

export default albumRoute;
