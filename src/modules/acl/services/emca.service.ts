export enum Chain {
  Hardhat = 'hardhat',
  Ethereum = 'ethereum',
  Polygon = 'polygon',
}

export type EntityMetadataCrudAclRequest = {
  chain: Chain;
  contractAddress: string;
  accountAddress: string;
  entityId: number;
};

export abstract class EntityMetadataCrudAclService {
  abstract canReadEntityMetadata(
    request: EntityMetadataCrudAclRequest,
  ): Promise<boolean>;

  abstract canCreateEntityMetadata(
    request: EntityMetadataCrudAclRequest,
  ): Promise<boolean>;

  abstract canUpdateEntityMetadata(
    request: EntityMetadataCrudAclRequest,
  ): Promise<boolean>;

  abstract canDeleteEntityMetadata(
    request: EntityMetadataCrudAclRequest,
  ): Promise<boolean>;
}
