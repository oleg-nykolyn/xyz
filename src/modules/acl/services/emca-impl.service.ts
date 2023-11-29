import { Logger } from '@nestjs/common';
import {
  Chain,
  EntityMetadataCrudAclRequest,
  EntityMetadataCrudAclService,
} from './emca.service';
import { ethers, Contract } from 'ethers';
import { EnvUtils } from 'src/utils/env.utils';
import { abi } from 'src/modules/acl/abis/EntityMetadataCrudAcl.json';

export class EntityMetadataCrudAclServiceImpl
  implements EntityMetadataCrudAclService
{
  private readonly logger = new Logger(EntityMetadataCrudAclServiceImpl.name);

  canReadEntityMetadata({
    chain,
    contractAddress,
    accountAddress,
    entityId,
  }: EntityMetadataCrudAclRequest): Promise<boolean> {
    return this.contractInstanceOf(
      chain,
      contractAddress,
    ).canReadEntityMetadata(accountAddress, entityId);
  }

  canCreateEntityMetadata({
    chain,
    contractAddress,
    accountAddress,
    entityId,
  }: EntityMetadataCrudAclRequest): Promise<boolean> {
    return this.contractInstanceOf(
      chain,
      contractAddress,
    ).canCreateEntityMetadata(accountAddress, entityId);
  }

  canUpdateEntityMetadata({
    chain,
    contractAddress,
    accountAddress,
    entityId,
  }: EntityMetadataCrudAclRequest): Promise<boolean> {
    return this.contractInstanceOf(
      chain,
      contractAddress,
    ).canUpdateEntityMetadata(accountAddress, entityId);
  }

  canDeleteEntityMetadata({
    chain,
    contractAddress,
    accountAddress,
    entityId,
  }: EntityMetadataCrudAclRequest): Promise<boolean> {
    return this.contractInstanceOf(
      chain,
      contractAddress,
    ).canDeleteEntityMetadata(accountAddress, entityId);
  }

  private contractInstanceOf(chain: Chain, contractAddress: string): Contract {
    return new ethers.Contract(
      contractAddress,
      abi,
      new ethers.JsonRpcProvider(this.getRpcUrlByChain(chain)),
    );
  }

  private getRpcUrlByChain(chain: Chain): string {
    switch (chain) {
      case Chain.Hardhat:
        return EnvUtils.hardhatRpcUrl();
      case Chain.Ethereum:
        return EnvUtils.ethereumRpcUrl();
      case Chain.Polygon:
        return EnvUtils.polygonRpcUrl();
    }
  }
}
