import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}
  async signIn(body): Promise<any> {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { email: body.email },
      });
      if (!user) {
        throw new UnauthorizedException('User not exist');
      }
      const isPasswordValid = await bcrypt.compare(
        body.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const { password, ...result } = user;
      const { id, email } = user;
      const pairToken = await this.SignToken(id, email);
      return { ...result, pairToken };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async SignToken(
    userId: number,
    email: string,
  ): Promise<{ access_Token: string; refresh_token: string }> {
    const payload = { sub: userId, email };

    // Use the TokenService for generating the tokens
    const accessToken = await this.tokenService.generateAccessToken(payload);
    const refreshToken = await this.tokenService.generateRefreshToken(payload);

    
    return { access_Token: accessToken, refresh_token: refreshToken };
  }
}
