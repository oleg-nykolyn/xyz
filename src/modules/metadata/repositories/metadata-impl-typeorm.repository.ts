import { Injectable } from '@nestjs/common';
import { MetadataQuery, MetadataRepository } from './metadata.repository';
import { EntityManager } from 'typeorm';
import { Metadata, MetadataId } from '../domain/metadata';
import { MetadataEntity } from '../entities/metadata.entity';

@Injectable()
export class MetadataRepositoryImplTypeOrm implements MetadataRepository {
  async find(
    entityManager: EntityManager,
    { chain, contractAddress, limit, offset }: MetadataQuery,
  ): Promise<Metadata[]> {
    const where = {};

    if (chain) {
      where['chain'] = chain;
    }

    if (contractAddress) {
      where['contractAddress'] = contractAddress;
    }

    const metadataEntities = await entityManager.find(MetadataEntity, {
      where,
      take: limit,
      skip: offset,
    });

    return metadataEntities.map(
      ({ chain, contractAddress, entityId, metadata }) =>
        Metadata.of(
          {
            chain,
            contractAddress,
            entityId,
          },
          metadata,
        ),
    );
  }

  async findById(
    entityManager: EntityManager,
    { chain, contractAddress, entityId }: MetadataId,
  ): Promise<Metadata | null> {
    const metadataEntity = await entityManager.findOneBy(MetadataEntity, {
      chain,
      contractAddress,
      entityId,
    });

    if (!metadataEntity) {
      return null;
    }

    return Metadata.of(
      {
        chain: metadataEntity.chain,
        contractAddress: metadataEntity.contractAddress,
        entityId: metadataEntity.entityId,
      },
      metadataEntity.metadata,
    );
  }

  async saveOrUpdate(
    entityManager: EntityManager,
    metadata: Metadata,
  ): Promise<Metadata> {
    await entityManager.save(MetadataEntity.from(metadata));

    return metadata;
  }

  async delete(entityManager: EntityManager, id: MetadataId): Promise<void> {
    await entityManager.delete(MetadataEntity, id);
  }
}
