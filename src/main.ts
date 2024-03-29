import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);//khi co tac dong tu ben ngoai vi du validate
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
