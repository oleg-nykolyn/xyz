import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';
import { MetadataService } from './services/metadata.service';
import { MetadataServiceImpl } from './services/metadata-impl.service';
import { MetadataRepository } from './repositories/metadata.repository';
import { MetadataRepositoryImplTypeOrm } from './repositories/typeorm/metadata-impl-typeorm.repository';
import { AclModule } from '../acl/acl.module';
import { MetadataOperationRepository } from './repositories/metadata-operation.repository';
import { MetadataOperationRepositoryImplTypeOrm } from './repositories/typeorm/metadata-operation-impl-typeorm.repository';

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
    {
      provide: MetadataOperationRepository,
      useClass: MetadataOperationRepositoryImplTypeOrm,
    },
  ],
})
export class MetadataModule {}
