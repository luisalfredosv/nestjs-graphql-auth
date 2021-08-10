import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserType } from 'src/user/user.type';
import { UserRepository } from 'src/user/user.repository';
import { LoginUserInput } from './dto/auth.input';
import { AuthType } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    private configServ: ConfigService,
    private jwtService: JwtService,
    private userRepo: UserRepository,
  ) {}

  async validateUser(loginUserInput: LoginUserInput) {
    const { password } = loginUserInput;
    const findUser = await this.userRepo.findOne(loginUserInput);
    if (findUser && bcrypt.compareSync(password, findUser.password)) {
      // const { password, ...rest } = findUser
      // return rest;
      return findUser
    }
    // throw new UnauthorizedException('Wrong email or password');
    return null;
  }

  async login(
    user: any,
  ): Promise<AuthType> {
   const accessToken = await this.generateAccessToken(user)
   const refreshToken = await this.generateRefreshToken(user)
    return {
      accessToken,
      refreshToken
    };
  }

  async verify(token: string): Promise<UserType> {
    const secret = this.configServ.get<string>('ACCESS_TOKEN_KEY');
    const decoded = this.jwtService.verify(token, {
      secret,
    });
    return await this.userRepo.findOne(decoded.username);
  }

  async generateRefreshToken(user: UserType){
    const secret = this.configServ.get<string>('REFRESH_TOKEN_KEY');
    const { id } = user
    return this.jwtService.sign({}, {
      expiresIn: '7d',
      subject: String(id),
      jwtid: String(id),
      secret,

    })
  }

  async generateAccessToken(user: UserType){
    const payload: JwtSignOptions = {
      subject: String(user.id)
    };
    return this.jwtService.sign(payload)
  }


}
