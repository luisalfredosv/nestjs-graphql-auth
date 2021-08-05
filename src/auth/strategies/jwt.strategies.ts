import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { FindOneUserInput } from 'src/user/dto/user.input';
import { UserType } from 'src/user/user.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN_KEY'),
    });
  }

  async validate(validationPayload: {
    username: string;
    sub: string;
  }): Promise<UserType> {
    const data : FindOneUserInput =  {
      email: validationPayload.username
    }
    const user = this.userService.findOne(data);
    if (!user) throw new AuthenticationError('Err');
    return user;
  }
}
