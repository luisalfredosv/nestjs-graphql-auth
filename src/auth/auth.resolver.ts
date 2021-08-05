import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { AuthType } from './auth.type';
import { GetUser } from './decorators/get-user.decorator';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { LoginUserInput } from "./dto/auth.input";
import { UserRepository } from 'src/user/user.repository';
import { UserType } from 'src/user/user.type';


@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userRepo: UserRepository
    ) {}

  @Mutation(() => AuthType )
  async login(@Args('loginUserInput') loginUserInput : LoginUserInput) {
    return await this.authService.login(loginUserInput)
  }

  @Mutation(() => String )
  async refreshToken(@Args('refreshToken') refreshToken: string) {
    return refreshToken
  }

  @Query((returns) => UserType)
  @UseGuards(GqlAuthGuard)
  async profileUser(@GetUser() user: UserType) {
    return await this.userRepo.findUserById(user.id);
  }
  
}
