import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  MetadataOperation,
  MetadataOperationType,
} from '../../../domain/metadata-operation';
import { MetadataId } from '../../../domain/metadata';
import { Chain } from 'src/modules/metadata/domain/chain';

@Entity({ name: 'metadata_operation' })
export class MetadataOperationTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({
    type: 'enum',
    enum: MetadataOperationType,
  })
  type: MetadataOperationType;

  @CreateDateColumn({ name: 'executed_at' })
  executedAt: Date;

  @Column({ name: 'executed_by' })
  executedBy: string;

  @Column({
    type: 'enum',
    enum: Chain,
    name: 'metadata_chain',
  })
  metadataChain: Chain;

  @Column({ name: 'metadata_contract_address' })
  metadataContractAddress: string;

  @Column({ name: 'metadata_entity_id' })
  metadataEntityId: number;

  @Column('simple-json', { name: 'metadata_content', nullable: true })
  metadataContent: any;

  static fromDomain(
    metadataOperation: MetadataOperation,
  ): MetadataOperationTypeOrmEntity {
    const metadataOperationEntity = new MetadataOperationTypeOrmEntity();
    metadataOperationEntity.id = metadataOperation.getId();
    metadataOperationEntity.type = metadataOperation.getType();
    metadataOperationEntity.executedAt = metadataOperation.getExecutedAt();
    metadataOperationEntity.executedBy = metadataOperation.getExecutedBy();

    const metadataId = metadataOperation.getMetadataId();

    metadataOperationEntity.metadataChain = metadataId.getChain();
    metadataOperationEntity.metadataContractAddress =
      metadataId.getContractAddress();
    metadataOperationEntity.metadataEntityId = metadataId.getEntityId();
    metadataOperationEntity.metadataContent =
      metadataOperation.getMetadataContent();

    return metadataOperationEntity;
  }

  toDomain(): MetadataOperation {
    return MetadataOperation.of({
      id: this.id,
      type: this.type,
      executedAt: this.executedAt,
      executedBy: this.executedBy,
      metadataId: MetadataId.of({
        chain: this.metadataChain,
        contractAddress: this.metadataContractAddress,
        entityId: this.metadataEntityId,
      }),
      metadataContent: this.metadataContent,
    });
  }
}
