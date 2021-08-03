import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from './users.repository';

@Module({
  providers: [UsersResolver, UsersService, PrismaService, UsersRepository]
})
export class UsersModule {}
