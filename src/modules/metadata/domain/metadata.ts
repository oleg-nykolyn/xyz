import { Chain } from 'src/modules/acl/services/emca.service';

export class Metadata {
  private constructor(
    private readonly chain: Chain,
    private readonly contractAddress: string,
    private readonly entityId: number,
    private readonly metadata: any,
  ) {}

  static of(
    chain: Chain,
    contractAddress: string,
    entityId: number,
    metadata: any,
  ): Metadata {
    return new Metadata(chain, contractAddress, entityId, metadata);
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

  getMetadata(): any {
    return this.metadata;
  }
}
