import { Injectable, Logger } from '@nestjs/common';
import { FindMetadataRequest, MetadataService } from './metadata.service';
import { MetadataRepository } from '../repositories/metadata.repository';
import { Metadata, MetadataId } from '../domain/metadata';

@Injectable()
export class MetadataServiceImpl implements MetadataService {
  private readonly logger = new Logger(MetadataServiceImpl.name);

  constructor(private readonly metadataRepository: MetadataRepository) {}
  findMetadata(request: FindMetadataRequest): Promise<Metadata[]> {
    throw new Error('Method not implemented.');
  }

  getMetadata(accountAddress: string, id: MetadataId): Promise<Metadata> {
    throw new Error('Method not implemented.');
  }

  createMetadata(
    accountAddress: string,
    metadata: Metadata,
  ): Promise<Metadata> {
    throw new Error('Method not implemented.');
  }

  updateMetadata(
    accountAddress: string,
    metadata: Metadata,
  ): Promise<Metadata> {
    throw new Error('Method not implemented.');
  }

  deleteMetadata(accountAddress: string, id: MetadataId): Promise<Metadata> {
    throw new Error('Method not implemented.');
  }
}
