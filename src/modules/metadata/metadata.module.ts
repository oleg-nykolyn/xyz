import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';
import { MetadataService } from './services/metadata.service';
import { MetadataServiceImpl } from './services/metadata-impl.service';

@Module({
  controllers: [MetadataController],
  providers: [
    {
      provide: MetadataService,
      useClass: MetadataServiceImpl,
    },
  ],
})
export class MetadataModule {}
