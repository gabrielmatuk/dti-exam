import { Hono } from 'hono';
import PhotoController from '@/controllers/photo.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';

const photoRoutes = new Hono();

photoRoutes.post('/user/photo', authMiddleware, PhotoController.createPhoto);
photoRoutes.post('/user/photo/album', authMiddleware, PhotoController.insertPhotoIntoAlbum);
photoRoutes.get('/user/photos', authMiddleware, PhotoController.listPhotos);
photoRoutes.get('/user/photo/:id', authMiddleware, PhotoController.getPhotoById);
photoRoutes.delete('/user/photo/:id', authMiddleware, PhotoController.deletePhotoById);

export default photoRoutes;
