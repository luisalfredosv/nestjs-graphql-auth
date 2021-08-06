import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { AuthType } from './auth.type';
import { CurrentUser  } from './decorators/get-user.decorator';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { LoginUserInput } from "./dto/auth.input";
import { UserRepository } from 'src/user/user.repository';
import { UserType } from 'src/user/user.type';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userRepo: UserRepository
    ) {}

  @Mutation(() => AuthType)//String)  
  @UseGuards(LocalAuthGuard)
  async login(@Args('loginUserInput') loginUserInput : LoginUserInput, @CurrentUser () user: UserType) {
    return await this.authService.login(user)
  }

  @Mutation(() => String )
  async refreshToken(@Args('refreshToken') refreshToken: string) {
    return refreshToken
  }

  @Query((returns) => UserType)
  @UseGuards(GqlAuthGuard)
  async profileUser(@CurrentUser () user: UserType) {
    return await this.userRepo.findUserById(user.id);
  }
  
}
