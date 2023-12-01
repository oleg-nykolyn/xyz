import { Chain } from 'src/modules/acl/services/emca.service';

export class MetadataId {
  private constructor(
    private readonly chain: Chain,
    private readonly contractAddress: string,
    private readonly entityId: number,
  ) {}

  static of({
    chain,
    contractAddress,
    entityId,
  }: {
    chain: Chain;
    contractAddress: string;
    entityId: number;
  }): MetadataId {
    return new MetadataId(chain, contractAddress.toLowerCase(), entityId);
  }

  getChain(): Chain {
    return this.chain;
  }

  getContractAddress(): string {
    return this.contractAddress;
  }

  getEntityId(): number {
    return this.entityId;
  }
}

export class Metadata {
  private constructor(
    private id: MetadataId,
    private content?: any,
    private createdBy?: string,
    private lastUpdatedBy?: string,
    private createdAt?: Date,
    private updatedAt?: Date,
  ) {}

  static of({
    id,
    content,
    createdBy,
    lastUpdatedBy,
    createdAt,
    updatedAt,
  }: {
    id: MetadataId;
    content?: any;
    createdBy?: string;
    lastUpdatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): Metadata {
    return new Metadata(
      id,
      content,
      createdBy,
      lastUpdatedBy,
      createdAt,
      updatedAt,
    );
  }

  getId(): MetadataId {
    return this.id;
  }

  getChain(): Chain {
    return this.id.getChain();
  }

  getContractAddress(): string {
    return this.id.getContractAddress();
  }

  getEntityId(): number {
    return this.id.getEntityId();
  }

  getContent(): any {
    return this.content;
  }

  getCreatedBy(): string {
    return this.createdBy;
  }

  getLastUpdatedBy(): string {
    return this.lastUpdatedBy;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
