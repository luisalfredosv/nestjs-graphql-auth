import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserType } from 'src/user/user.type';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refreshToken') {
  constructor(
    private configService: ConfigService,
    private userRepo: UserRepository
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
  }): Promise<UserType>{
    const { sub } = validationPayload
    const user = await this.userRepo.findUserById(Number(sub));
    if (!user) throw new AuthenticationError('No access');
    return user;
  }
}
