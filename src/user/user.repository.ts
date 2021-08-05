import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateUserInput,
  DeleteUserInput,
  FindOneUserInput,
  UpdateUserInput,
} from './dto/user.input';
import * as bcrypt from 'bcrypt';
import { UserType } from './user.type';

@Injectable()
export class UserRepository {
  constructor(private prismaServ: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<UserType> {

    const { password } = createUserInput
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.prismaServ.user.create({
      data: {
        ...createUserInput,
        password: hashedPassword
      },
    });
  }

  async findAll(): Promise<UserType[]> {
    return await this.prismaServ.user.findMany();
  }

  async findOne(findOneUserInput: FindOneUserInput): Promise<UserType> {
    const { email } = findOneUserInput;
    return this.prismaServ.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(updateUserInput: UpdateUserInput): Promise<UserType> {
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

  async remove(deleteUserInput: DeleteUserInput): Promise<UserType> {
    return await this.prismaServ.user.delete({
      where: {
        id: deleteUserInput.id,
      },
    });
  }

  async findUserById(id: number): Promise<UserType> {
    return await this.prismaServ.user.findUnique({
      where: {
        id,
      },
    });
  }
}
