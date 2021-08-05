import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserType } from 'src/user/user.type';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      idField: 'id',
    });
  }

  async validate(username: string, password: string): Promise<UserType> {
   try {
    const user = await this.authService.validate({ email: username , password });
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
   } catch (error) {
     throw new InternalServerErrorException('x5559494')
   }
  }
}
