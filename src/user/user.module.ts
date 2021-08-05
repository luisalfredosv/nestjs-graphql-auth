import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserService, UserRepository, UserResolver, PrismaService],
  exports:[UserRepository]
})
export class UserModule {}
