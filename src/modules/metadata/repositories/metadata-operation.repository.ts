import { EntityManager } from 'typeorm';
import { MetadataId } from '../domain/metadata';
import { MetadataOperation } from '../domain/metadata-operation';

export interface GetMetadataOperationsQuery {
  metadataId: MetadataId;
  limit: number;
  offset: number;
}

export abstract class MetadataOperationRepository {
  abstract save(
    entityManager: EntityManager,
    operation: MetadataOperation,
  ): Promise<MetadataOperation>;

  abstract getMetadataOperations(
    entityManager: EntityManager,
    query: GetMetadataOperationsQuery,
  ): Promise<MetadataOperation[]>;
}
