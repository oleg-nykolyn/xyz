import { Injectable, Logger } from '@nestjs/common';
import {
  FindMetadataRequest,
  GetMetadataCountPerContractByChainRequest,
  GetMetadataHistoryRequest,
  MetadataCountPerContract,
  MetadataService,
} from './metadata.service';
import { MetadataRepository } from '../repositories/metadata.repository';
import {
  Metadata,
  MetadataId,
  ViewableOrObscuredMetadata,
} from '../domain/metadata';
import { EntityMetadataCrudAclService } from 'src/modules/acl/services/emca.service';
import { DataSource } from 'typeorm';
import { UnauthorizedException } from './exceptions/unauthorized.exception';
import { MetadataNotFoundException } from '../repositories/exceptions/metadata-not-found.exception';
import { MetadataAlreadyExistsException } from '../repositories/exceptions/metadata-already-exists.exception';
import { MetadataOperationRepository } from '../repositories/metadata-operation.repository';
import {
  MetadataOperation,
  MetadataOperationType,
} from '../domain/metadata-operation';

@Injectable()
export class MetadataServiceImpl implements MetadataService {
  private readonly logger = new Logger(MetadataServiceImpl.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly metadataRepository: MetadataRepository,
    private readonly metadataOperationRepository: MetadataOperationRepository,
    private readonly entityMetadataCrudAclService: EntityMetadataCrudAclService,
  ) {}

  async findMetadata({
    accountAddress,
    chain,
    contractAddress,
    limit,
    offset,
  }: FindMetadataRequest): Promise<ViewableOrObscuredMetadata[]> {
    try {
      contractAddress = contractAddress?.toLowerCase();

      const foundMetadata: Metadata[] = await this.metadataRepository.find(
        this.dataSource.manager,
        {
          chain,
          contractAddress,
          limit,
          offset,
        },
      );

      return Promise.all(
        foundMetadata.map(async (metadata) => {
          try {
            if (
              await this.entityMetadataCrudAclService.canReadEntityMetadata({
                chain: metadata.getChain(),
                contractAddress: metadata.getContractAddress(),
                accountAddress,
                entityId: metadata.getEntityId(),
              })
            ) {
              return metadata;
            }

            return metadata.getId();
          } catch (e) {
            this.logger.error(e);
            return metadata.getId();
          }
        }),
      );
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async getMetadataCountPerContractByChain({
    chain,
    limit,
    offset,
  }: GetMetadataCountPerContractByChainRequest): Promise<
    MetadataCountPerContract[]
  > {
    try {
      return await this.metadataRepository.getMetadataCountPerContractByChain(
        this.dataSource.manager,
        {
          chain,
          limit,
          offset,
        },
      );
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async getMetadata(accountAddress: string, id: MetadataId): Promise<Metadata> {
    try {
      if (
        !(await this.metadataRepository.exists(this.dataSource.manager, id))
      ) {
        throw new MetadataNotFoundException(id);
      }

      const canRead =
        await this.entityMetadataCrudAclService.canReadEntityMetadata({
          chain: id.getChain(),
          contractAddress: id.getContractAddress(),
          accountAddress,
          entityId: id.getEntityId(),
        });

      if (!canRead) {
        throw new UnauthorizedException();
      }

      return await this.metadataRepository.get(this.dataSource.manager, id);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async createMetadata(
    accountAddress: string,
    id: MetadataId,
    content: any,
  ): Promise<Metadata> {
    try {
      if (await this.metadataRepository.exists(this.dataSource.manager, id)) {
        throw new MetadataAlreadyExistsException(id);
      }

      const canCreate =
        await this.entityMetadataCrudAclService.canCreateEntityMetadata({
          chain: id.getChain(),
          contractAddress: id.getContractAddress(),
          accountAddress,
          entityId: id.getEntityId(),
        });

      if (!canCreate) {
        throw new UnauthorizedException();
      }

      const metadata = Metadata.of({
        id,
        content,
        createdBy: accountAddress,
        lastUpdatedBy: accountAddress,
      });

      return await this.dataSource.manager.transaction(async (manager) => {
        const createdMetadata = await this.metadataRepository.save(
          manager,
          metadata,
        );

        await this.metadataOperationRepository.save(
          manager,
          MetadataOperation.of({
            type: MetadataOperationType.Create,
            executedBy: accountAddress,
            metadataId: metadata.getId(),
            metadataContent: metadata.getContent(),
          }),
        );

        return createdMetadata;
      });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async updateMetadata(
    accountAddress: string,
    id: MetadataId,
    content: any,
  ): Promise<Metadata> {
    try {
      if (
        !(await this.metadataRepository.exists(this.dataSource.manager, id))
      ) {
        throw new MetadataNotFoundException(id);
      }

      const canUpdate =
        await this.entityMetadataCrudAclService.canUpdateEntityMetadata({
          chain: id.getChain(),
          contractAddress: id.getContractAddress(),
          accountAddress,
          entityId: id.getEntityId(),
        });

      if (!canUpdate) {
        throw new UnauthorizedException();
      }

      const metadata = Metadata.of({
        id,
        content,
        lastUpdatedBy: accountAddress,
      });

      return await this.dataSource.manager.transaction(async (manager) => {
        const updatedMetadata = await this.metadataRepository.update(
          manager,
          metadata,
        );

        await this.metadataOperationRepository.save(
          manager,
          MetadataOperation.of({
            type: MetadataOperationType.Update,
            executedBy: accountAddress,
            metadataId: updatedMetadata.getId(),
            metadataContent: updatedMetadata.getContent(),
          }),
        );

        return updatedMetadata;
      });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async deleteMetadata(accountAddress: string, id: MetadataId): Promise<void> {
    try {
      if (
        !(await this.metadataRepository.exists(this.dataSource.manager, id))
      ) {
        throw new MetadataNotFoundException(id);
      }

      const canDelete =
        await this.entityMetadataCrudAclService.canDeleteEntityMetadata({
          chain: id.getChain(),
          contractAddress: id.getContractAddress(),
          accountAddress,
          entityId: id.getEntityId(),
        });

      if (!canDelete) {
        throw new UnauthorizedException();
      }

      await this.dataSource.manager.transaction(async (manager) => {
        await this.metadataRepository.delete(manager, id);
        await this.metadataOperationRepository.save(
          manager,
          MetadataOperation.of({
            type: MetadataOperationType.Delete,
            executedBy: accountAddress,
            metadataId: id,
            metadataContent: null,
          }),
        );
      });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async getMetadataHistory({
    accountAddress,
    id,
    limit,
    offset,
  }: GetMetadataHistoryRequest): Promise<MetadataOperation[]> {
    try {
      if (
        !(await this.metadataRepository.exists(this.dataSource.manager, id))
      ) {
        throw new MetadataNotFoundException(id);
      }

      const canRead =
        await this.entityMetadataCrudAclService.canReadEntityMetadata({
          chain: id.getChain(),
          contractAddress: id.getContractAddress(),
          accountAddress,
          entityId: id.getEntityId(),
        });

      if (!canRead) {
        throw new UnauthorizedException();
      }

      return await this.metadataOperationRepository.getOperationsByMetadataId(
        this.dataSource.manager,
        {
          id,
          limit,
          offset,
        },
      );
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
