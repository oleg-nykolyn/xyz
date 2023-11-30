import { Chain } from 'src/modules/acl/services/emca.service';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Metadata } from '../domain/metadata';

@Entity({ name: 'metadata' })
export class MetadataEntity {
  @PrimaryColumn({
    type: 'enum',
    enum: Chain,
  })
  chain: Chain;

  @PrimaryColumn({ name: 'contract_address' })
  contractAddress: string;

  @PrimaryColumn({ name: 'entity_id' })
  entityId: number;

  @Column('simple-json')
  metadata: any;

  static from(metadata: Metadata): MetadataEntity {
    const metadataEntity = new MetadataEntity();
    metadataEntity.chain = metadata.getChain();
    metadataEntity.contractAddress = metadata.getContractAddress();
    metadataEntity.entityId = metadata.getEntityId();
    metadataEntity.metadata = metadata.getMetadata();

    return metadataEntity;
  }
}
