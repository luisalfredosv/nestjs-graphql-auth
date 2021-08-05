import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserType } from 'src/user/user.type';
import { UserRepository } from 'src/user/user.repository';
import { LoginUserInput } from './dto/auth.input';

@Injectable()
export class AuthService {
  constructor(
    private configServ: ConfigService,
    private jwtService: JwtService,
    private userRepo: UserRepository,
  ) {}

  async validate(loginUserInput: LoginUserInput) {
    const { password } = loginUserInput;
    const findUser = await this.userRepo.findOne(loginUserInput);
    if (findUser && bcrypt.compareSync(password, findUser.password)) {
      return findUser;
    }
    throw new UnauthorizedException('Wrong email or password');
  }

  async login(
    loginUserInput: LoginUserInput,
  ): Promise<{ access_token: string }> {
    const { id, email: userEmail } = await this.validate(loginUserInput);
    const payload = {
      sub: id,
      username: userEmail,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(token: string): Promise<UserType> {
    const secret = this.configServ.get<string>('ACCESS_TOKEN_KEY');
    const decoded = this.jwtService.verify(token, {
      secret,
    });
    return await this.userRepo.findOne(decoded.username);
  }
}
