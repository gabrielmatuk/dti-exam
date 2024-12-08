import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email!: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsOptional()
  name!: string;

  @IsBoolean()
  @IsOptional()
  role?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
