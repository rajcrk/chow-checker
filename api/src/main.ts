import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv'

async function bootstrap() {

  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Chow Checker API')
    .setDescription('Details on Chow Checker APIs')
    .setVersion('1.0')
    .addTag('cc')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(process.env.PORT ? process.env.PORT : 8080);
}
bootstrap();
