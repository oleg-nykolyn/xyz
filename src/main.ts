import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvUtils } from './utils/env.utils';
import { LogUtils } from './utils/log.utils';
import { VersioningType } from '@nestjs/common';
import cookieParser = require('cookie-parser');
import { Swagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LogUtils.getSupportedLogLevels(),
  });

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  app.enableCors();
  app.use(cookieParser());

  if (EnvUtils.environmentType() === 'development' || EnvUtils.useSwagger()) {
    Swagger.setUp(app);
  }

  await app.listen(EnvUtils.port());
}

bootstrap();
