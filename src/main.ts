import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvUtils } from './utils/env';
import { LoggerUtils } from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerUtils.getSupportedLogLevels(),
  });

  await app.listen(EnvUtils.getPort());
}

bootstrap();
