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
    const secret = this.config.get('JWT_SECRET');
    return await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
  }

  // Method to generate the refresh token
  async generateRefreshToken(payload: object): Promise<string> {
    const secret = this.config.get('JWT_SECRET');
    return await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret,
    });
  }
}
