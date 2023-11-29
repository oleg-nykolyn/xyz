import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from './utils/env';
import { LogUtils } from './utils/log';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LogUtils.getSupportedLogLevels(),
  });

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  await app.listen(Env.port());
}

bootstrap();
