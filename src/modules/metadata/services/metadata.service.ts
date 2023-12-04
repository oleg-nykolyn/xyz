import { Chain } from 'src/modules/acl/services/emca.service';
import {
  Metadata,
  MetadataId,
  ViewableOrObscuredMetadata,
} from '../domain/metadata';
import { MetadataOperation } from '../domain/metadata-operation';

export interface FindMetadataRequest {
  accountAddress: string;
  chain?: Chain;
  contractAddress?: string;
  limit: number;
  offset: number;
}

export interface GetMetadataCountPerContractByChainRequest {
  chain: Chain;
  limit: number;
  offset: number;
}

export interface GetMetadataHistoryRequest {
  accountAddress: string;
  id: MetadataId;
  limit: number;
  offset: number;
}

export interface MetadataCountPerContract {
  chain: Chain;
  contractAddress: string;
  metadataCount: number;
}

export abstract class MetadataService {
  abstract findMetadata(
    request: FindMetadataRequest,
  ): Promise<ViewableOrObscuredMetadata[]>;

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

  abstract getMetadataCountPerContractByChain(
    request: GetMetadataCountPerContractByChainRequest,
  ): Promise<MetadataCountPerContract[]>;

  abstract getMetadataOperationHistory(
    request: GetMetadataHistoryRequest,
  ): Promise<MetadataOperation[]>;
}
