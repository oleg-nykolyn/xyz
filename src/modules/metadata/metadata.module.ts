import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';
import { MetadataService } from './services/metadata.service';
import { MetadataServiceImpl } from './services/metadata-impl.service';
import { MetadataRepository } from './repositories/metadata.repository';
import { MetadataRepositoryImplTypeOrm } from './repositories/metadata-impl-typeorm.repository';
import { AclModule } from '../acl/acl.module';

@Module({
  imports: [AclModule],
  controllers: [MetadataController],
  providers: [
    {
      provide: MetadataService,
      useClass: MetadataServiceImpl,
    },
    {
      provide: MetadataRepository,
      useClass: MetadataRepositoryImplTypeOrm,
    },
  ],
})
export class MetadataModule {}
