import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [ JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
