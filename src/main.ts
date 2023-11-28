import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from './utils/env';
import { LogUtils } from './utils/log';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LogUtils.getSupportedLogLevels(),
  });

  await app.listen(Env.port());
}

bootstrap();
