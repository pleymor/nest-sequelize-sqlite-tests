import { NestFactory } from '@nestjs/core';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import initData from './utils/testing-helpers/initData';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe());

  // let's init a few data =)
  initData(app);

  await app.listen(3000, '0.0.0.0');
  console.info(`http://localhost:3000`);
}

bootstrap();
