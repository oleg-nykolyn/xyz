import { Injectable } from '@nestjs/common';
import {
  FindQuery,
  GetMetadataCountPerContractByChainQuery,
  MetadataRepository,
} from '../metadata.repository';
import { EntityManager } from 'typeorm';
import { Metadata, MetadataId } from '../../domain/metadata';
import { MetadataTypeOrmEntity } from './entities/metadata.typeorm.entity';
import { MetadataNotFoundException } from '../exceptions/metadata-not-found.exception';
import { MetadataCountPerContract } from '../../services/metadata.service';

@Injectable()
export class MetadataRepositoryImplTypeOrm implements MetadataRepository {
  async find(
    entityManager: EntityManager,
    { chain, contractAddress, limit, offset }: FindQuery,
  ): Promise<Metadata[]> {
    const where = {};

    if (chain) {
      where['chain'] = chain;
    }

    if (contractAddress) {
      where['contractAddress'] = contractAddress;
    }

    const metadataEntities = await entityManager.find(MetadataTypeOrmEntity, {
      where,
      take: limit,
      skip: offset,
      order: {
        updatedAt: 'DESC',
      },
    });

    return metadataEntities.map((metadataEntity) => metadataEntity.toDomain());
  }

  async get(entityManager: EntityManager, id: MetadataId): Promise<Metadata> {
    const metadataEntity = await entityManager.findOneBy(
      MetadataTypeOrmEntity,
      {
        chain: id.getChain(),
        contractAddress: id.getContractAddress(),
        entityId: id.getEntityId(),
      },
    );

    if (!metadataEntity) {
      throw new MetadataNotFoundException(id);
    }

    return metadataEntity.toDomain();
  }

  async update(
    entityManager: EntityManager,
    metadata: Metadata,
  ): Promise<Metadata> {
    const id = metadata.getId();
    const metadataEntity = await entityManager.findOneBy(
      MetadataTypeOrmEntity,
      {
        chain: id.getChain(),
        contractAddress: id.getContractAddress(),
        entityId: id.getEntityId(),
      },
    );

    if (!metadataEntity) {
      throw new MetadataNotFoundException(metadata.getId());
    }

    metadataEntity.content = metadata.getContent();
    metadataEntity.lastUpdatedBy = metadata.getLastUpdatedBy();

    return (await entityManager.save(metadataEntity)).toDomain();
  }

  async save(
    entityManager: EntityManager,
    metadata: Metadata,
  ): Promise<Metadata> {
    return (
      await entityManager.save(MetadataTypeOrmEntity.fromDomain(metadata))
    ).toDomain();
  }

  async delete(entityManager: EntityManager, id: MetadataId): Promise<void> {
    await entityManager.delete(MetadataTypeOrmEntity, id);
  }

  exists(entityManager: EntityManager, id: MetadataId): Promise<boolean> {
    return entityManager.exists(MetadataTypeOrmEntity, {
      where: {
        chain: id.getChain(),
        contractAddress: id.getContractAddress(),
        entityId: id.getEntityId(),
      },
    });
  }

  async getMetadataCountPerContractByChain(
    entityManager: EntityManager,
    { chain, limit, offset }: GetMetadataCountPerContractByChainQuery,
  ): Promise<MetadataCountPerContract[]> {
    const metadataCountGroups = await entityManager
      .createQueryBuilder(MetadataTypeOrmEntity, 'metadata')
      .select('metadata.contract_address')
      .addSelect('count(*) as metadata_entries')
      .where('metadata.chain = :chain', { chain })
      .groupBy('metadata.contract_address')
      .orderBy('metadata_entries', 'DESC')
      .limit(limit)
      .offset(offset)
      .getRawMany();

    return metadataCountGroups.map(
      ({ contract_address, metadata_entries }) => ({
        chain,
        contractAddress: contract_address,
        metadataCount: metadata_entries,
      }),
    );
  }
}
