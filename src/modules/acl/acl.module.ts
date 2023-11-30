import { Module } from '@nestjs/common';
import { EntityMetadataCrudAclService } from './services/emca.service';
import { EntityMetadataCrudAclServiceImpl } from './services/emca-impl.service';

@Module({
  providers: [
    {
      provide: EntityMetadataCrudAclService,
      useClass: EntityMetadataCrudAclServiceImpl,
    },
  ],
  exports: [EntityMetadataCrudAclService],
})
export class AclModule {}
