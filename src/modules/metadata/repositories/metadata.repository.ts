import { EntityManager } from 'typeorm';
import { Metadata, MetadataId } from '../domain/metadata';

export interface MetadataQuery {
  chain?: string;
  contractAddress?: string;
  limit: number;
  offset: number;
}

export abstract class MetadataRepository {
  abstract find(query: MetadataQuery): Promise<Metadata[]>;

  abstract saveOrUpdate(
    entityManager: EntityManager,
    metadata: Metadata,
  ): Promise<Metadata>;

  abstract delete(
    entityManager: EntityManager,
    id: MetadataId,
  ): Promise<Metadata>;
}
