import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { CreateUserInput, DeleteUserInput, FindOneUserInput, UpdateUserInput } from './dto/user.input';
import { UserType } from './user.type';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserInput: CreateUserInput): Promise<UserType>  {
    try {
      return await this.userRepository.create(createUserInput)
    } catch (error) {
      throw new InternalServerErrorException('U0001');
    }
  }

  async findAll(): Promise<UserType[]> {
    try {
      return await this.userRepository.findAll()
    } catch (error) {
      throw new InternalServerErrorException('U0002');
    }
  }

  async findOne(findOneUserInput : FindOneUserInput): Promise<UserType>{
    try {
      const user = await this.userRepository.findOne(findOneUserInput)     
      if(!user) throw new NotFoundException('User not found')
      return user
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(updateUserInput: UpdateUserInput): Promise<UserType>{
   try {
    const { id } = updateUserInput
    const findUserById = await this.userRepository.findUserById(id)
    if(!findUserById) throw new NotFoundException('User not found')
    return await this.userRepository.update(findUserById);
   } catch (error) {
    throw new InternalServerErrorException('U0004');
   }
  }

  async remove(deleteUserInput: DeleteUserInput): Promise<UserType>{
    try {
      const { id } = deleteUserInput
      const findUserById = await this.userRepository.findUserById(id)
      return await this.userRepository.remove(deleteUserInput);
     } catch (error) {
      throw new InternalServerErrorException('U0005');
     }
  }
}
