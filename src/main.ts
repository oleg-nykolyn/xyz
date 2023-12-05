import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvUtils } from './utils/env.utils';
import { LogUtils } from './utils/log.utils';
import { VersioningType } from '@nestjs/common';
import cookieParser = require('cookie-parser');
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './modules/auth/auth.module';
import { MetadataModule } from './modules/metadata/metadata.module';
import { StringUtils } from './utils/string.utils';

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
    configureSwagger(app);
  }

  await app.listen(EnvUtils.port());
}

bootstrap();

function configureSwagger(app) {
  const titlePostfix = 'RESTful API';

  const swaggerApiV1Prefix = 'swagger/api/v1';
  const v1 = '1.0';
  const v1Modules = {
    auth: AuthModule,
    metadata: MetadataModule,
  };

  for (const [moduleName, module] of Object.entries(v1Modules)) {
    const options = new DocumentBuilder()
      .setTitle(`${StringUtils.capitalize(moduleName)} ${titlePostfix}`)
      .setVersion(v1)
      .addTag(moduleName)
      .build();
    const document = SwaggerModule.createDocument(app, options, {
      include: [module],
    });
    SwaggerModule.setup(`${swaggerApiV1Prefix}/${moduleName}`, app, document);
  }
}
