import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  
  @Expose()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Expose()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;
}
