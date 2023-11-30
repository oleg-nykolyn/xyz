import { Injectable } from '@nestjs/common';
import {
  FindMetadataRequest,
  Metadata,
  MetadataId,
  MetadataService,
} from './metadata.service';
import { MetadataRepository } from '../repositories/metadata.repository';

@Injectable()
export class MetadataServiceImpl implements MetadataService {
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
