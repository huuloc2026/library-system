import { Expose } from "class-transformer"
import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginDTO {
  @Expose()
  @IsNotEmpty({ message: 'Please provide email ! Email is required' })
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty({ message: 'Please provide password ! password is required' })
  password: string;
}