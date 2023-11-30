import { Injectable } from '@nestjs/common';
import { MetadataQuery, MetadataRepository } from './metadata.repository';
import { EntityManager, QueryFailedError } from 'typeorm';
import { Metadata, MetadataId } from '../domain/metadata';
import { MetadataEntity } from '../entities/metadata.entity';
import { MetadataAlreadyExistsException } from './exceptions/metadata-already-exists.exception';
import { MetadataNotFoundException } from './exceptions/metadata-not-found.exception';

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
      ({ chain, contractAddress, entityId, content }) =>
        Metadata.of(
          {
            chain,
            contractAddress,
            entityId,
          },
          content,
        ),
    );
  }

  async get(entityManager: EntityManager, id: MetadataId): Promise<Metadata> {
    const metadataEntity = await entityManager.findOneBy(MetadataEntity, id);

    if (!metadataEntity) {
      throw new MetadataNotFoundException(id);
    }

    return Metadata.of(
      {
        chain: metadataEntity.chain,
        contractAddress: metadataEntity.contractAddress,
        entityId: metadataEntity.entityId,
      },
      metadataEntity.content,
    );
  }

  async update(
    entityManager: EntityManager,
    metadata: Metadata,
  ): Promise<Metadata> {
    if (!(await this.exists(entityManager, metadata.getId()))) {
      throw new MetadataNotFoundException(metadata.getId());
    }

    await entityManager.update(MetadataEntity, metadata.getId(), {
      content: metadata.getContent(),
    });

    return metadata;
  }

  async save(
    entityManager: EntityManager,
    metadata: Metadata,
  ): Promise<Metadata> {
    try {
      await entityManager.save(MetadataEntity.from(metadata));
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new MetadataAlreadyExistsException(metadata.getId());
      }

      throw e;
    }

    return metadata;
  }

  async delete(entityManager: EntityManager, id: MetadataId): Promise<void> {
    if (!(await this.exists(entityManager, id))) {
      throw new MetadataNotFoundException(id);
    }

    await entityManager.delete(MetadataEntity, id);
  }

  private exists(
    entityManager: EntityManager,
    id: MetadataId,
  ): Promise<boolean> {
    return entityManager.exists(MetadataEntity, {
      where: id,
    });
  }
}
