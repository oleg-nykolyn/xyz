import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Metadata, MetadataId } from '../../../domain/metadata';
import { Chain } from 'src/modules/metadata/domain/chain';

@Entity({ name: 'metadata' })
export class MetadataTypeOrmEntity {
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
  content: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'last_updated_by' })
  lastUpdatedBy: string;

  static fromDomain(metadata: Metadata): MetadataTypeOrmEntity {
    const metadataEntity = new MetadataTypeOrmEntity();
    metadataEntity.chain = metadata.getChain();
    metadataEntity.contractAddress = metadata.getContractAddress();
    metadataEntity.entityId = metadata.getEntityId();
    metadataEntity.content = metadata.getContent();
    metadataEntity.createdBy = metadata.getCreatedBy();
    metadataEntity.lastUpdatedBy = metadata.getLastUpdatedBy();

    return metadataEntity;
  }

  toDomain(): Metadata {
    return Metadata.of({
      id: MetadataId.of({
        chain: this.chain,
        contractAddress: this.contractAddress,
        entityId: this.entityId,
      }),
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      lastUpdatedBy: this.lastUpdatedBy,
    });
  }
}
