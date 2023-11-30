import { Chain } from 'src/modules/acl/services/emca.service';

export interface MetadataId {
  chain: Chain;
  contractAddress: string;
  entityId: string;
}

export interface Metadata {
  id: MetadataId;
  metadata: any;
}

export interface FindMetadataRequest {
  limit: number;
  offset: number;
  chain?: Chain;
  contractAddress?: string;
}

export abstract class MetadataService {
  abstract findMetadata(request: FindMetadataRequest): Promise<Metadata[]>;

  abstract getMetadata(id: MetadataId): Promise<Metadata>;

  abstract createMetadata(metadata: Metadata): Promise<Metadata>;

  abstract updateMetadata(metadata: Metadata): Promise<Metadata>;

  abstract deleteMetadata(id: MetadataId): Promise<Metadata>;
}
