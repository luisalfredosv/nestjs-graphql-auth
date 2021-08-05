import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { UserService } from './user.service';
import {
  CreateUserInput,
  UpdateUserInput,
  FindOneUserInput,
  DeleteUserInput,
} from './dto/user.input';
import { UserType } from './user.type';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserType)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Query(() => [UserType], { name: 'findUsers' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => UserType, { name: 'findUserByEmail' })
  async findOne(@Args('findUserInput') findOneUserInput: FindOneUserInput) {
    return await this.userService.findOne(findOneUserInput);
  }

  @Mutation(() => UserType)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.update(updateUserInput);
  }

  @Mutation(() => UserType)
  async removeUser(@Args('deleteUserInput') deleteUserInput: DeleteUserInput) {
    return await this.userService.remove(deleteUserInput);
  }
}
