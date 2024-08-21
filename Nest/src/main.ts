import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev')); // set in file

  app.enableCors({
    origin: '*', 
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
