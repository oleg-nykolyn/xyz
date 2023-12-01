import { Chain } from 'src/modules/acl/services/emca.service';
import {
  Metadata,
  MetadataId,
  ViewableOrObscuredMetadata,
} from '../domain/metadata';

export interface FindMetadataRequest {
  accountAddress: string;
  chain?: Chain;
  contractAddress?: string;
  limit: number;
  offset: number;
}

export abstract class MetadataService {
  abstract findMetadata(
    request: FindMetadataRequest,
  ): Promise<ViewableOrObscuredMetadata[]>;

  abstract getMetadata(
    accountAddress: string,
    id: MetadataId,
  ): Promise<ViewableOrObscuredMetadata>;

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
