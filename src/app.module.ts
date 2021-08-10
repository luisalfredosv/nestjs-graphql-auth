import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisClientModule } from './redis-client/redis-client.module';

const logger = new Logger();

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      debug: true,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        config: {
          // host: configService.get<string>('REDIS_HOST'),
          // port: configService.get<number>('REDIS_PORT'),
          // username: configService.get<string>('REDIS_USERNAME'),
          // password: configService.get<string>('REDIS_PASSWORD'),
          // enableAutoPipelining: configService.get('REDIS_AUTO_PIPELINIG'),
          namespace: configService.get('REDIS_NAMESPACE'),
          // db: 2,
          url: configService.get('REDIS_URL'),
          onClientCreated(client) {
            client.on('ready', () => {
              logger.log('REDIS Ok')
            });
            client.on('error', err => {
              logger.error('REDIS ERR')
            });
          },
        }
    }),
    // useClass:
    // useExisting:
  }),
    RedisClientModule
  ],
})
export class AppModule {}
