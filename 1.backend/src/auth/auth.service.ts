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
  async signIn(body:any): Promise<any> {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { email: body.email },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      if (!(await validPassword(body.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const { password,updatedAt,createdAt, ...result } = user;
      const payload: UserPayload = {
        // create payload for JWT
        sub: user.id,
        email: user.email,
      };
      const jwt = await this.tokenService.SignToken(payload);
      return { ...result, jwt };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
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
