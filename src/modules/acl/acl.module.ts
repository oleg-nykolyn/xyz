import { Module } from '@nestjs/common';
import { EntityMetadataCrudAclService } from './services/emca.service';
import { EntityMetadataCrudAclServiceImplRpc } from './services/emca-impl-rpc.service';

@Module({
  providers: [
    {
      provide: EntityMetadataCrudAclService,
      useClass: EntityMetadataCrudAclServiceImplRpc,
    },
  ],
  exports: [EntityMetadataCrudAclService],
})
export class AclModule {}
