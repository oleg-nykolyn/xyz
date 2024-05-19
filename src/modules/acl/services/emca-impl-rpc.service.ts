import { Logger, OnModuleInit } from '@nestjs/common';
import {
  EntityMetadataCrudAclRequest,
  EntityMetadataCrudAclService,
} from './emca.service';
import { ethers, Contract } from 'ethers';
import { Env } from 'src/utils/env.utils';
import { abi } from 'src/modules/acl/abis/EntityMetadataCrudAcl.json';
import { Chain } from 'src/modules/metadata/domain/chain';

export class EntityMetadataCrudAclServiceImplRpc
  implements EntityMetadataCrudAclService, OnModuleInit
{
  private readonly logger = new Logger(
    EntityMetadataCrudAclServiceImplRpc.name,
  );
  private rpcProviders = new Map<Chain, ethers.JsonRpcProvider>();

  onModuleInit() {
    this.rpcProviders.set(
      Chain.Hardhat,
      new ethers.JsonRpcProvider(Env.rpcUrlHardhat()),
    );
    this.rpcProviders.set(
      Chain.Ethereum,
      new ethers.JsonRpcProvider(Env.rpcUrlEthereum()),
    );
    this.rpcProviders.set(
      Chain.Polygon,
      new ethers.JsonRpcProvider(Env.rpcUrlPolygon()),
    );
    this.rpcProviders.set(
      Chain.MultiVAC,
      new ethers.JsonRpcProvider(Env.rpcUrlMultivac()),
    );
  }

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
      this.rpcProviders.get(chain),
    );
  }
}
