import { Injectable, Logger } from '@nestjs/common';
import {
  FindMetadataRequest,
  MetadataId,
  MetadataService,
} from './metadata.service';
import { MetadataRepository } from '../repositories/metadata.repository';
import { Metadata } from '../domain/metadata';

@Injectable()
export class MetadataServiceImpl implements MetadataService {
  private readonly logger = new Logger(MetadataServiceImpl.name);

  constructor(private readonly metadataRepository: MetadataRepository) {}

  findMetadata(request: FindMetadataRequest): Promise<Metadata[]> {
    throw new Error('Method not implemented.');
  }

  getMetadata(id: MetadataId): Promise<Metadata> {
    throw new Error('Method not implemented.');
  }

  createMetadata(metadata: Metadata): Promise<Metadata> {
    throw new Error('Method not implemented.');
  }

  updateMetadata(metadata: Metadata): Promise<Metadata> {
    throw new Error('Method not implemented.');
  }

  deleteMetadata(id: MetadataId): Promise<Metadata> {
    throw new Error('Method not implemented.');
  }
}
