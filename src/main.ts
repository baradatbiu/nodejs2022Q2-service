import { ConfigService } from '@nestjs/config';
import { CustomLogger } from './logger/custom-logger.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.useLogger(new CustomLogger(configService));

  const customLoggerService = new CustomLogger(configService);
  customLoggerService.setContext(bootstrap.name);

  process.on('uncaughtException', (err: Error) => {
    const errorLog = `Uncaught Exception occurred at: ${JSON.stringify(
      err.stack || err,
    )}`;

    customLoggerService.warn(errorLog, bootstrap.name);
  });

  process.on('unhandledRejection', (err: Error) => {
    const errorLog = `Unhandled Rejection occurred at: ${JSON.stringify(
      err.stack || err,
    )}`;

    customLoggerService.warn(errorLog, bootstrap.name);
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const rootDirname = dirname(__dirname);
  const API_YAML = await readFile(
    join(rootDirname, 'doc', 'api.yaml'),
    'utf-8',
  );
  const document = parse(API_YAML);

  SwaggerModule.setup('doc', app, document);

  await app.listen(+configService.get<number>('PORT') || 4000, '0.0.0.0');
}
bootstrap();
