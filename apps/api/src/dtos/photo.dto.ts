import { IsInt, IsNotEmpty } from 'class-validator';

export class PhotoDto {
  @IsInt()
  @IsNotEmpty()
  photoId!: number;

  @IsInt()
  @IsNotEmpty()
  albumId!: number;
}
