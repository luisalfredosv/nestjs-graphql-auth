import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import {
  CreateUserInput,
  UpdateUserInput,
  FindOneUserInput,
  DeleteUserInput,
} from './dto/user.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'findUsers' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Query(() => User, { name: 'findUserByEmail' })
  async findOne(@Args('findUserInput') findOneUserInput: FindOneUserInput) {
    return await this.usersService.findOne(findOneUserInput);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.usersService.update(updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('deleteUserInput') deleteUserInput: DeleteUserInput) {
    return await this.usersService.remove(deleteUserInput);
  }
}
