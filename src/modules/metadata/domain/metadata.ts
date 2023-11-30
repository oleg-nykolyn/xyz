import { Chain } from 'src/modules/acl/services/emca.service';

export interface MetadataId {
  chain: Chain;
  contractAddress: string;
  entityId: number;
}

export class Metadata {
  private constructor(
    private readonly id: MetadataId,
    private readonly content: any,
  ) {}

  static of(metadataId: MetadataId, content: any): Metadata {
    return new Metadata(metadataId, content);
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
}
