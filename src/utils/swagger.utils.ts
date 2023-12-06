import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { StringUtils } from './string.utils';
import { AuthModule } from 'src/modules/auth/auth.module';
import { MetadataModule } from 'src/modules/metadata/metadata.module';

export class SwaggerUtils {
  static configureSwagger(app) {
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
}
