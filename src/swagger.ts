import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { StringUtils } from './utils/string.utils';
import { AuthModule } from 'src/modules/auth/auth.module';
import { MetadataModule } from 'src/modules/metadata/metadata.module';
import { INestApplication } from '@nestjs/common';

export class Swagger {
  static setUp(app: INestApplication<any>) {
    const titlePostfix = 'RESTful API';

    const swaggerApiV1Prefix = 'swagger/api/v1';
    const v1 = '1.0';
    const v1Modules = {
      auth: AuthModule,
      metadata: MetadataModule,
    };

    for (const [moduleName, module] of Object.entries(v1Modules)) {
      const optionsBuilder = new DocumentBuilder()
        .setTitle(`${StringUtils.capitalize(moduleName)} ${titlePostfix}`)
        .setVersion(v1)
        .addTag(moduleName);

      const options = optionsBuilder.build();
      const document = SwaggerModule.createDocument(app, options, {
        include: [module],
      });
      SwaggerModule.setup(`${swaggerApiV1Prefix}/${moduleName}`, app, document);
    }
  }
}
