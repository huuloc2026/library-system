import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { LocalStrategy } from './passport/local.stategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [UserModule, JwtModule.register({}), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, LocalStrategy, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
