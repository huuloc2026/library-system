import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { LocalStrategy } from './passport/local.stategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';


@Module({
  imports: [UserModule, JwtModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    LocalStrategy,
    JwtStrategy,
    MailService,
  ],
  exports: [JwtStrategy, TokenService, AuthService],
})
export class AuthModule {}
