import { Injectable, Logger } from '@nestjs/common';
import { FindMetadataRequest, MetadataService } from './metadata.service';
import { MetadataRepository } from '../repositories/metadata.repository';
import { Metadata, MetadataId } from '../domain/metadata';
import { EntityMetadataCrudAclService } from 'src/modules/acl/services/emca.service';
import { DataSource } from 'typeorm';
import { UnauthorizedException } from './exceptions/unauthorized.exception';

@Injectable()
export class MetadataServiceImpl implements MetadataService {
  private readonly logger = new Logger(MetadataServiceImpl.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly metadataRepository: MetadataRepository,
    private readonly entityMetadataCrudAclService: EntityMetadataCrudAclService,
  ) {}

  findMetadata(request: FindMetadataRequest): Promise<Metadata[]> {
    // TODO ...
    this.logger.log(request);
    throw new Error('Method not implemented.');
  }

  async getMetadata(accountAddress: string, id: MetadataId): Promise<Metadata> {
    try {
      const { chain, contractAddress, entityId } = id;
      const canRead =
        await this.entityMetadataCrudAclService.canReadEntityMetadata({
          chain,
          contractAddress,
          accountAddress,
          entityId,
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
      const { chain, contractAddress, entityId } = id;
      const canCreate =
        await this.entityMetadataCrudAclService.canCreateEntityMetadata({
          chain,
          contractAddress,
          accountAddress,
          entityId,
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
      const { chain, contractAddress, entityId } = id;
      const canUpdate =
        await this.entityMetadataCrudAclService.canUpdateEntityMetadata({
          chain,
          contractAddress,
          accountAddress,
          entityId,
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
      const { chain, contractAddress, entityId } = id;
      const canDelete =
        await this.entityMetadataCrudAclService.canDeleteEntityMetadata({
          chain,
          contractAddress,
          accountAddress,
          entityId,
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
