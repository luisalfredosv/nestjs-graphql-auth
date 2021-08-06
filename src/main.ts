import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as compression from 'compression';

import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {  
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  // app.use(helmet());
  // app.use(csurf());
  app.use(compression());

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app)

  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT || 3000

  await app.listen(PORT);

  logger.log(`[Application listening] on port ${PORT}`);
}
bootstrap();
