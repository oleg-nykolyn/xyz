import {
  FindMetadataRequest,
  Metadata,
  MetadataId,
  MetadataService,
} from './metadata.service';

export class MetadataServiceImpl implements MetadataService {
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
