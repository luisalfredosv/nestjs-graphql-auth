import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {  
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app)

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);

  logger.log(`[Application listening] on port 3000`);
}
bootstrap();
