import { Expose } from "class-transformer"
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator"

export class RegisterNewuserDTO {
  @Expose()
  @IsNotEmpty({ message: 'Please provide email ! Email is required' })
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty({ message: 'Please provide password ! password is required' })
  password: string;

  @IsOptional()
  firstName: string;
  @IsOptional()
  lastName: string;
  @IsOptional()
  phone: string;

  @IsOptional()
  codeId: string
}