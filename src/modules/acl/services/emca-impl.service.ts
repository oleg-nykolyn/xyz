import { Logger, OnModuleInit } from '@nestjs/common';
import {
  Chain,
  EntityMetadataCrudAclRequest,
  EntityMetadataCrudAclService,
} from './emca.service';
import { ethers, Contract } from 'ethers';
import { EnvUtils } from 'src/utils/env.utils';
import { abi } from 'src/modules/acl/abis/EntityMetadataCrudAcl.json';

export class EntityMetadataCrudAclServiceImpl
  implements EntityMetadataCrudAclService, OnModuleInit
{
  private readonly logger = new Logger(EntityMetadataCrudAclServiceImpl.name);
  private rpcProviders = new Map<Chain, ethers.JsonRpcProvider>();

  onModuleInit() {
    this.rpcProviders.set(
      Chain.Hardhat,
      new ethers.JsonRpcProvider(EnvUtils.hardhatRpcUrl()),
    );
    this.rpcProviders.set(
      Chain.Ethereum,
      new ethers.JsonRpcProvider(EnvUtils.ethereumRpcUrl()),
    );
    this.rpcProviders.set(
      Chain.Polygon,
      new ethers.JsonRpcProvider(EnvUtils.polygonRpcUrl()),
    );
    this.rpcProviders.set(
      Chain.MultiVAC,
      new ethers.JsonRpcProvider(EnvUtils.multivacRpcUrl()),
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
