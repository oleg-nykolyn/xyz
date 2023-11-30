import { EntityManager } from 'typeorm';
import { Metadata, MetadataId } from '../domain/metadata';
import { Chain } from 'src/modules/acl/services/emca.service';

export interface MetadataQuery {
  chain?: Chain;
  contractAddress?: string;
  limit: number;
  offset: number;
}

export abstract class MetadataRepository {
  abstract find(
    entityManager: EntityManager,
    query: MetadataQuery,
  ): Promise<Metadata[]>;

  abstract findById(
    entityManager: EntityManager,
    id: MetadataId,
  ): Promise<Metadata | null>;

  abstract saveOrUpdate(
    entityManager: EntityManager,
    metadata: Metadata,
  ): Promise<Metadata>;

  abstract delete(entityManager: EntityManager, id: MetadataId): Promise<void>;
}
