// src/auth/token.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; 
import { ConfigService } from '@nestjs/config'; 
@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  // Method to generate the access token
  async generateAccessToken(payload: object): Promise<string> {
    const secret = this.config.get('JWT_SECRET_ACCESS');
    const expiresTime = this.config.get('JWT_EXPIRES_ACCESS');
    return await this.jwtService.signAsync(payload, {
      expiresIn: expiresTime,
      secret,
    });
  }

  // Method to generate the refresh token
  async generateRefreshToken(payload: object): Promise<string> {
    const secret = this.config.get('JWT_SECRET_REFRESH');
    const expiresTime = this.config.get('JWT_EXPIRES_REFRESH');
    return await this.jwtService.signAsync(payload, {
      expiresIn: expiresTime,
      secret,
    });
  }
  async SignToken(
    payload:any
  ): Promise<{ access_Token: string; refresh_token: string }> {
    // Use the TokenService for generating the tokens
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    return { access_Token: accessToken, refresh_token: refreshToken };
  }
}
