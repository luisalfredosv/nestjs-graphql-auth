import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ UsersModule, PrismaModule ,GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      debug: true
    }),
  ],
  controllers: [],
  providers: [PrismaModule],
})
export class AppModule {}
