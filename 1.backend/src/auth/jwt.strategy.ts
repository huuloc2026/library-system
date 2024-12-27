import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';


enum JWT_SECRET {
  ACCESS = 'JWT_SECRET_ACCESS',
  REFRESH = 'JWT_SECRET_REFRESH',
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_ACCESS'),
    });
  }

  async validate(payload: any) {  
    return { userId: payload.sub, email: payload.email };
  }
}
