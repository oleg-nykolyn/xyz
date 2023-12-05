import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvUtils } from './utils/env.utils';
import { LogUtils } from './utils/log.utils';
import { VersioningType } from '@nestjs/common';
import cookieParser = require('cookie-parser');
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './modules/auth/auth.module';
import { MetadataModule } from './modules/metadata/metadata.module';

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

  if (EnvUtils.environmentType() === 'development') {
    configureSwagger(app);
  }

  await app.listen(EnvUtils.port());
}

bootstrap();

function configureSwagger(app) {
  const authOptions = new DocumentBuilder()
    .setTitle('Auth RESTful API')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const authDocument = SwaggerModule.createDocument(app, authOptions, {
    include: [AuthModule],
  });
  SwaggerModule.setup('api/v1/auth', app, authDocument);

  const metadataOptions = new DocumentBuilder()
    .setTitle('Metadata RESTful API')
    .setVersion('1.0')
    .addTag('metadata')
    .build();

  const metadataDocument = SwaggerModule.createDocument(app, metadataOptions, {
    include: [MetadataModule],
  });
  SwaggerModule.setup('api/v1/metadata', app, metadataDocument);
}
