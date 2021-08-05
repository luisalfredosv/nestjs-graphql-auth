import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from 'src/user/user.repository';

import { UserService } from 'src/user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guards/local-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_KEY'),
        signOptions: {
          expiresIn: '30m',
          issuer: 'localhost',
          audience: 'localhost',
        },
      }),
    }),
  ],
  exports: [AuthService],
  providers: [
    JwtStrategy,
    LocalStrategy,
    AuthService,
    AuthResolver,
    UserService,
    UserRepository,
    PrismaService,
    AuthService,
  ],
})
export class AuthModule {}
