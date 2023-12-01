import { Chain } from 'src/modules/acl/services/emca.service';

export interface MetadataId {
  chain: Chain;
  contractAddress: string;
  entityId: number;
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
    return this.id.chain;
  }

  getContractAddress(): string {
    return this.id.contractAddress;
  }

  getEntityId(): number {
    return this.id.entityId;
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
