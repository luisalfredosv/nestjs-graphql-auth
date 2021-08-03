import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateUserInput,
  DeleteUserInput,
  FindOneUserInput,
  UpdateUserInput,
} from './dto/user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private prismaServ: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    return await this.prismaServ.user.create({
      data: createUserInput,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prismaServ.user.findMany();
  }

  async findOne(findOneUserInput: FindOneUserInput): Promise<User> {
    const { email } = findOneUserInput;
    return this.prismaServ.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const { id, lastName, name } = updateUserInput;
    return await this.prismaServ.user.update({
      where: {
        id: id,
      },
      data: {
        lastName,
        name,
      },
    });
  }

  async remove(deleteUserInput: DeleteUserInput): Promise<User> {
    return await this.prismaServ.user.delete({
      where: {
        id: deleteUserInput.id,
      },
    });
  }

  async findUserById(id: number): Promise<User> {
    return await this.prismaServ.user.findUnique({
      where: {
        id,
      },
    });
  }
}
