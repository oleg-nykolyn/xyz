import { Injectable, Logger } from '@nestjs/common';
import { FindMetadataRequest, MetadataService } from './metadata.service';
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

@Injectable()
export class MetadataServiceImpl implements MetadataService {
  private readonly logger = new Logger(MetadataServiceImpl.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly metadataRepository: MetadataRepository,
    private readonly entityMetadataCrudAclService: EntityMetadataCrudAclService,
  ) {}

  async findMetadata({
    accountAddress,
    chain,
    contractAddress,
    limit,
    offset,
  }: FindMetadataRequest): Promise<ViewableOrObscuredMetadata[]> {
    contractAddress = contractAddress.toLowerCase();

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
          return metadata.getId();
        }
      }),
    );
  }

  async getMetadata(
    accountAddress: string,
    id: MetadataId,
  ): Promise<ViewableOrObscuredMetadata> {
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
        return id;
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

      return await this.metadataRepository.save(
        this.dataSource.manager,
        metadata,
      );
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

      return await this.metadataRepository.update(
        this.dataSource.manager,
        metadata,
      );
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

      await this.metadataRepository.delete(this.dataSource.manager, id);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
