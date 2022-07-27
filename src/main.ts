import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const rootDirname = dirname(__dirname);
  const API_YAML = await readFile(
    join(rootDirname, 'doc', 'api.yaml'),
    'utf-8',
  );
  const document = parse(API_YAML);

  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 4000, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
