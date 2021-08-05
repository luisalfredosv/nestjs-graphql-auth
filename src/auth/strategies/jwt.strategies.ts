import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { FindOneUserInput } from 'src/user/dto/user.input';
import { UserType } from 'src/user/user.type';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private userRepo: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN_KEY'),
    });
  }

  async validate(validationPayload: {
    subject: string,
    aud: string,
    iss: string
  }): Promise<UserType> {
    
   try {
    const { subject } = validationPayload
    const user = await this.userRepo.findUserById(Number(subject));
    if (!user) throw new AuthenticationError('No access');
    return user;
   } catch (error) {
    throw new UnauthorizedException(`You don't have access 🙃`);
   }
  }
}
