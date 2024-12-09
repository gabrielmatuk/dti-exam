import type { Context } from 'hono';
import { PhotoService } from '@/services/photo.services';
import type { CustomFile } from '@/types';
import { getEmailByJwt } from '@/utils/get-email-by-jwt';
import { plainToInstance } from 'class-transformer';
import { PhotoDto } from '@/dtos/photo.dto';
import { validate } from 'class-validator';

const photoService = new PhotoService();

class PhotoController {
  public async listPhotos(c: Context) {
    try {
      const page = Number(c.req.query('page')) || 1;
      const pageSize = Number(c.req.query('pageSize')) || 5;
      const email = getEmailByJwt(c);

      const { photos, total } = await photoService.getAllPhotos(page, pageSize, email);

      return c.json({
        photos,
        count: photos.length,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      });
    } catch (err) {
      console.log(err);
      return c.json({ message: 'Failed to list photos' }, 400);
    }
  }

  public async getPhotoById(c: Context) {
    try {
      const id = Number(c.req.param('id'));
      if (Number.isNaN(id)) {
        return c.json({ message: 'Invalid photo ID' }, 400);
      }
      const photo = await photoService.getPhotoById(id);

      return c.json({ photo });
    } catch (err) {
      console.log(err);
      return c.json({ message: 'Failed to get photo' }, 400);
    }
  }

  public async deletePhotoById(c: Context) {
    try {
      const photoId = Number(c.req.param('id'));
      if (Number.isNaN(photoId)) {
        return c.json({ message: 'Invalid photo ID' }, 400);
      }

      await photoService.deletePhotoById(photoId);
      return c.json({}, 204);
    } catch (err) {
      console.log(err);
      return c.json({ message: 'Failed to delete photo' }, 400);
    }
  }

  public async createPhoto(c: Context) {
    try {
      const contentType = c.req.header('content-type') || '';
      if (!contentType.includes('multipart/form-data')) {
        return c.json({ message: 'Invalid content type' }, 400);
      }

      const formData = await c.req.parseBody();
      const file: CustomFile = formData.file as CustomFile;
      if (!file || typeof file === 'string') {
        return c.json({ message: 'File is required and must be valid' }, 400);
      }
      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedMimeTypes.includes(file.type)) {
        return c.json({ message: 'Invalid file type' }, 400);
      }

      const maxFileSize = 25 * 1024 * 1024;
      if (file.size > maxFileSize) {
        return c.json({ message: 'File size exceeds the limit of 25MB' }, 400);
      }
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const email = getEmailByJwt(c);
      const newPhoto = await photoService.createPhoto(buffer, file.name, email);

      return c.json({ newPhoto }, 201);
    } catch (err) {
      console.error(err);
      return c.json({ message: 'Failed to create photo' }, 400);
    }
  }

  public async insertPhotoIntoAlbum(c: Context) {
    try {
      const body = await c.req.json();
      const email = getEmailByJwt(c);

      const photoDto = plainToInstance(PhotoDto, body);

      const errors = await validate(photoDto);
      if (errors.length > 0) {
        return c.json({ errors }, 400);
      }

      const photo = await photoService.insertPhotoIntoAlbum(
        photoDto.photoId,
        photoDto.albumId,
        email,
      );

      return c.json({ photo });
    } catch (err) {
      console.log(err);
      return c.json({ message: 'Failed to insert photo into album' }, 400);
    }
  }
}

export default new PhotoController();
