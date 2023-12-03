import { EntityManager } from 'typeorm';
import { Metadata, MetadataId } from '../domain/metadata';
import { Chain } from 'src/modules/acl/services/emca.service';
import { MetadataCountPerContract } from '../services/metadata.service';

export interface FindQuery {
  chain?: Chain;
  contractAddress?: string;
  limit: number;
  offset: number;
}

export interface GetMetadataCountPerContractByChainQuery {
  chain: Chain;
  limit: number;
  offset: number;
}

export abstract class MetadataRepository {
  abstract find(
    entityManager: EntityManager,
    query: FindQuery,
  ): Promise<Metadata[]>;

  abstract get(entityManager: EntityManager, id: MetadataId): Promise<Metadata>;

  abstract save(
    entityManager: EntityManager,
    metadata: Metadata,
  ): Promise<Metadata>;

  abstract update(
    entityManager: EntityManager,
    metadata: Metadata,
  ): Promise<Metadata>;

  abstract delete(entityManager: EntityManager, id: MetadataId): Promise<void>;

  abstract exists(
    entityManager: EntityManager,
    id: MetadataId,
  ): Promise<boolean>;

  abstract getMetadataCountPerContractByChain(
    entityManager: EntityManager,
    query: GetMetadataCountPerContractByChainQuery,
  ): Promise<MetadataCountPerContract[]>;
}
