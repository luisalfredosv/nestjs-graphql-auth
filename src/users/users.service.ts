import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserInput, DeleteUserInput, FindOneUserInput, UpdateUserInput } from './dto/user.input';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async create(createUserInput: CreateUserInput): Promise<User>  {
    try {
      return await this.userRepository.create(createUserInput)
    } catch (error) {
      throw new InternalServerErrorException('U0001');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.findAll()
    } catch (error) {
      throw new InternalServerErrorException('U0002');
    }
  }

  async findOne(findOneUserInput : FindOneUserInput): Promise<User>{
    try {
      const user = await this.userRepository.findOne(findOneUserInput)     
      if(!user) throw new NotFoundException('User not found')
      return user
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(updateUserInput: UpdateUserInput): Promise<User>{
   try {
    const { id } = updateUserInput
    const findUserById = await this.userRepository.findUserById(id)
    if(!findUserById) throw new NotFoundException('User not found')
    return await this.userRepository.update(findUserById);
   } catch (error) {
    throw new InternalServerErrorException('U0004');
   }
  }

  async remove(deleteUserInput: DeleteUserInput): Promise<User>{
    try {
      const { id } = deleteUserInput
      const findUserById = await this.userRepository.findUserById(id)
      return await this.userRepository.remove(deleteUserInput);
     } catch (error) {
      throw new InternalServerErrorException('U0005');
     }
  }
}
