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
  const swaggerXyzApiV1Prefix = 'swagger/api/v1';
  const titlePostfix = 'RESTful API';
  const v1 = '1.0';

  const authOptions = new DocumentBuilder()
    .setTitle(`Auth ${titlePostfix}`)
    .setVersion(v1)
    .addTag('auth')
    .build();
  const authDocument = SwaggerModule.createDocument(app, authOptions, {
    include: [AuthModule],
  });
  SwaggerModule.setup(`${swaggerXyzApiV1Prefix}/auth`, app, authDocument);

  const metadataOptions = new DocumentBuilder()
    .setTitle(`Metadata ${titlePostfix}`)
    .setVersion(v1)
    .addTag('metadata')
    .build();
  const metadataDocument = SwaggerModule.createDocument(app, metadataOptions, {
    include: [MetadataModule],
  });
  SwaggerModule.setup(
    `${swaggerXyzApiV1Prefix}/metadata`,
    app,
    metadataDocument,
  );
}
