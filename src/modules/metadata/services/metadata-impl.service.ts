import { Injectable, Logger } from '@nestjs/common';
import { FindMetadataRequest, MetadataService } from './metadata.service';
import { MetadataRepository } from '../repositories/metadata.repository';
import { Metadata, MetadataId } from '../domain/metadata';
import { EntityMetadataCrudAclService } from 'src/modules/acl/services/emca.service';
import { DataSource } from 'typeorm';

@Injectable()
export class MetadataServiceImpl implements MetadataService {
  private readonly logger = new Logger(MetadataServiceImpl.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly metadataRepository: MetadataRepository,
    private readonly entityMetadataCrudAclService: EntityMetadataCrudAclService,
  ) {}

  findMetadata(request: FindMetadataRequest): Promise<Metadata[]> {
    throw new Error('Method not implemented.');
  }

  async getMetadata(accountAddress: string, id: MetadataId): Promise<Metadata> {
    const { chain, contractAddress, entityId } = id;
    const canRead =
      await this.entityMetadataCrudAclService.canReadEntityMetadata({
        chain,
        contractAddress,
        accountAddress,
        entityId,
      });

    if (!canRead) {
      throw new Error('Unauthorized');
    }

    return this.metadataRepository.get(this.dataSource.manager, id);
  }

  async createMetadata(
    accountAddress: string,
    metadata: Metadata,
  ): Promise<Metadata> {
    const { chain, contractAddress, entityId } = metadata.getId();
    const canCreate =
      await this.entityMetadataCrudAclService.canCreateEntityMetadata({
        chain,
        contractAddress,
        accountAddress,
        entityId,
      });

    if (!canCreate) {
      throw new Error('Unauthorized');
    }

    return this.metadataRepository.save(this.dataSource.manager, metadata);
  }

  async updateMetadata(
    accountAddress: string,
    metadata: Metadata,
  ): Promise<Metadata> {
    const { chain, contractAddress, entityId } = metadata.getId();
    const canUpdate =
      await this.entityMetadataCrudAclService.canUpdateEntityMetadata({
        chain,
        contractAddress,
        accountAddress,
        entityId,
      });

    if (!canUpdate) {
      throw new Error('Unauthorized');
    }

    return this.metadataRepository.update(this.dataSource.manager, metadata);
  }

  async deleteMetadata(accountAddress: string, id: MetadataId): Promise<void> {
    const { chain, contractAddress, entityId } = id;
    const canDelete =
      await this.entityMetadataCrudAclService.canDeleteEntityMetadata({
        chain,
        contractAddress,
        accountAddress,
        entityId,
      });

    if (!canDelete) {
      throw new Error('Unauthorized');
    }

    return this.metadataRepository.delete(this.dataSource.manager, id);
  }
}
