import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { MetadataOperation } from '../domain/metadata-operation';
import { MetadataOperationEntity } from '../entities/metadata-operation.entity';
import {
  GetMetadataOperationsQuery,
  MetadataOperationRepository,
} from './metadata-operation.repository';

@Injectable()
export class MetadataOperationRepositoryImplTypeOrm
  implements MetadataOperationRepository
{
  async save(
    entityManager: EntityManager,
    operation: MetadataOperation,
  ): Promise<MetadataOperation> {
    return (
      await entityManager.save(MetadataOperationEntity.fromDomain(operation))
    ).toDomain();
  }

  async getOperationsByMetadataId(
    entityManager: EntityManager,
    { id, limit, offset }: GetMetadataOperationsQuery,
  ): Promise<MetadataOperation[]> {
    const metadataOperations = await entityManager.find(
      MetadataOperationEntity,
      {
        where: {
          metadataChain: id.getChain(),
          metadataContractAddress: id.getContractAddress(),
          metadataEntityId: id.getEntityId(),
        },
        take: limit,
        skip: offset,
        order: {
          executedAt: 'DESC',
        },
      },
    );

    return metadataOperations.map((operation) => operation.toDomain());
  }
}
