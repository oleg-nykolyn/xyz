import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';
import { MetadataService } from './services/metadata.service';
import { MetadataServiceImpl } from './services/metadata-impl.service';
import { MetadataRepository } from './repositories/metadata.repository';
import { MetadataRepositoryImpl } from './repositories/metadata-impl.repository';

@Module({
  controllers: [MetadataController],
  providers: [
    {
      provide: MetadataService,
      useClass: MetadataServiceImpl,
    },
    {
      provide: MetadataRepository,
      useClass: MetadataRepositoryImpl,
    },
  ],
})
export class MetadataModule {}
