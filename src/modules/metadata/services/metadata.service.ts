import { Chain } from 'src/modules/acl/services/emca.service';
import { Metadata, MetadataId } from '../domain/metadata';

export interface FindMetadataRequest {
  accountAddress: string;
  chain?: Chain;
  contractAddress?: string;
  limit: number;
  offset: number;
}

export abstract class MetadataService {
  abstract findMetadata(request: FindMetadataRequest): Promise<Metadata[]>;

  abstract getMetadata(
    accountAddress: string,
    id: MetadataId,
  ): Promise<Metadata>;

  abstract createMetadata(
    accountAddress: string,
    id: MetadataId,
    content: any,
  ): Promise<Metadata>;

  abstract updateMetadata(
    accountAddress: string,
    id: MetadataId,
    content: any,
  ): Promise<Metadata>;

  abstract deleteMetadata(
    accountAddress: string,
    id: MetadataId,
  ): Promise<void>;
}
