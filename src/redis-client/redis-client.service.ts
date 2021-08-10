import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { DEFAULT_REDIS_CLIENT, RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisClientService {
  private clientDefault: Redis;

  constructor(
    private readonly redisService: RedisService
  ){
    this.clientDefault = this.redisService.getClient('localhost');
    this.set();
  }

  async set(): Promise<void> {
    await this.clientDefault.set('foo', 'bar');
  }

  
}
