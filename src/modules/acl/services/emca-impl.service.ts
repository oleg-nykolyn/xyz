import { Logger } from '@nestjs/common';
import {
  EntityMetadataCrudAclRequest,
  EntityMetadataCrudAclService,
} from './emca.service';
import { ethers, Contract } from 'ethers';
import { Env } from 'src/utils/env';
import { abi } from 'src/modules/acl/abis/XYZMetadataAccessControl.json';

export class EntityMetadataCrudAclServiceImpl
  implements EntityMetadataCrudAclService
{
  private readonly logger = new Logger(EntityMetadataCrudAclServiceImpl.name);

  canReadEntityMetadata({
    contractAddress,
    accountAddress,
    entityId,
  }: EntityMetadataCrudAclRequest): Promise<boolean> {
    return this.contractInstanceOf(contractAddress).canReadEntityMetadata(
      accountAddress,
      entityId,
    );
  }

  canCreateEntityMetadata({
    contractAddress,
    accountAddress,
    entityId,
  }: EntityMetadataCrudAclRequest): Promise<boolean> {
    return this.contractInstanceOf(contractAddress).canCreateEntityMetadata(
      accountAddress,
      entityId,
    );
  }

  canUpdateEntityMetadata({
    contractAddress,
    accountAddress,
    entityId,
  }: EntityMetadataCrudAclRequest): Promise<boolean> {
    return this.contractInstanceOf(contractAddress).canUpdateEntityMetadata(
      accountAddress,
      entityId,
    );
  }

  canDeleteEntityMetadata({
    contractAddress,
    accountAddress,
    entityId,
  }: EntityMetadataCrudAclRequest): Promise<boolean> {
    return this.contractInstanceOf(contractAddress).canDeleteEntityMetadata(
      accountAddress,
      entityId,
    );
  }

  private contractInstanceOf(contractAddress: string): Contract {
    return new ethers.Contract(
      contractAddress,
      abi,
      new ethers.JsonRpcProvider(Env.rpcUrl()),
    );
  }
}
