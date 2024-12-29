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
import {
  ApiResponse,
  ResponseHandlerService,
} from 'src/common/response-handler.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from './decoraters/public-decorator';
import { RegisterNewuserDTO } from './dto/CreateUserDto';
import { MailService } from 'src/mail/mail.service';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private emailsent: MailService,
    private responseHandler: ResponseHandlerService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async Login(@Request() req) {
    try {
      const user = req.user;
      const result = await this.authService.signIn(user);
      return this.responseHandler.success(result, 'Login successful');
    } catch (error) {
      return this.responseHandler.error(error.message,null)
    }
  }

  @Post('register')
  @Public()
  async Register(@Body() registerUser: RegisterNewuserDTO) {
    const result = await this.authService.Register(registerUser);
    return this.responseHandler.success(result, 'Register successful');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProtectedData(@Request() req) {
    const user = req.user;
    return user;
  }

  @Get('test')
  @Public()
  async TestEmail() {
    console.log('Mail route accessed');
    const result = await this.emailsent.sendUserConfirmation(
      'huuloc2026@gmail.com',
      '202002',
    );
    return `oke`;
  }
}
