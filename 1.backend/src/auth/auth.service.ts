import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { validPassword } from 'src/common/utils/hash';
import { UserPayload } from 'src/user/interfaces/users-login.interface.ts';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private tokenService: TokenService,
  ) {}
  async signIn(user: any): Promise<any> {
    try {
      // create payload for JWT
      const payload: UserPayload = {
        sub: user.id,
        email: user.email,
      };
      const jwt = await this.tokenService.SignToken(payload);
      return {user,jwt}
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (user && await validPassword(pass,user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  // async SignToken(
  //   userId: number,
  //   email: string,
  // ): Promise<{ access_Token: string; refresh_token: string }> {
  //   const payload = { sub: userId, email };

  //   // Use the TokenService for generating the tokens
  //   const accessToken = await this.tokenService.generateAccessToken(payload);
  //   const refreshToken = await this.tokenService.generateRefreshToken(payload);

  //   return { access_Token: accessToken, refresh_token: refreshToken };
  // }
}
