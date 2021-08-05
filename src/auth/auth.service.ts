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
  ): Promise<AuthType> {
    const user = await this.validate(loginUserInput);
   
    return {
      access_token: await this.generateAccessToken(user),
      refresh_token: await this.generateRefreshToken(user)
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
      secret
    })
  }

  // async jwtRefreshVerify(refreshToken: string){
  //   const secret = 'hola';
  //   return this.jwtService.verify(refreshToken)
  // }

  async generateAccessToken(user: UserType){
    const payload: JwtSignOptions = {
      subject: String(user.id)
    };
    return this.jwtService.sign(payload)
  }


}
