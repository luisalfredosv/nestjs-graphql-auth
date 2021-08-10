import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserType } from 'src/user/user.type';
import { UserRepository } from 'src/user/user.repository';
import { AuthService } from '../auth.service';
import { AuthType } from '../auth.type';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refreshToken') {
  constructor(
    private configService: ConfigService,
    private userRepo: UserRepository,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('REFRESH_TOKEN_KEY'),
    });
  }

  async validate(validationPayload: {
    subject: string,
    aud: string,
    iss: string,
    sub: string
  }): Promise<AuthType>{
    const { sub } = validationPayload
    const user = await this.userRepo.findUserById(Number(sub));
    if (!user) throw new AuthenticationError('No access');

    const accessToken = await this.authService.generateAccessToken(user)
    const refreshToken = await this.authService.generateRefreshToken(user)

    return {
      accessToken,
      refreshToken
    };
  }
}
