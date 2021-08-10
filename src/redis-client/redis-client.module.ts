import { Module } from '@nestjs/common';
import { RedisClientService } from './redis-client.service';

@Module({
  providers: [RedisClientService]
})
export class RedisClientModule {}
