import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/LoginDto';
import { ApiResponse, ResponseHandlerService } from 'src/common/response-handler.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private responseHandler: ResponseHandlerService,
  ) {}

  @Post()
  async Register(@Body() body: LoginDTO):Promise<ApiResponse<any>> {
     try {
       const result = await this.authService.signIn(body);
       return this.responseHandler.success(result, 'Login successful');
     } catch (error) {
       return this.responseHandler.error(error.message, null);
     }
  }
}
