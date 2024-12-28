import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/LoginDto';
import {
  ApiResponse,
  ResponseHandlerService,
} from 'src/common/response-handler.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from './decoraters/public-decorator';
import { RegisterNewuserDTO } from './dto/CreateUserDto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private responseHandler: ResponseHandlerService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async Login(@Request() req) {
    const user = req.user;
    const result = await this.authService.signIn(user);
    return this.responseHandler.success(result, 'Login successful');
  }

  @Post('register')
  @Public()
  async Register(@Body() registerUser: RegisterNewuserDTO ) {
    const result = await this.authService.Register(registerUser);
    return this.responseHandler.success(result, 'Register successful');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProtectedData(@Request() req) {
    const user = req.user;
    return user;
  }
}
