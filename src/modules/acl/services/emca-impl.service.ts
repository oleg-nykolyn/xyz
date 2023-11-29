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
    contactAddress,
    accountAddress,
    entityId,
  }: EntityMetadataCrudAclRequest): Promise<boolean> {
    return this.contractInstanceOf(contactAddress).canReadEntityMetadata(
      accountAddress,
      entityId,
    );
  }

  canCreateEntityMetadata({
    contactAddress,
    accountAddress,
    entityId,
  }: EntityMetadataCrudAclRequest): Promise<boolean> {
    return this.contractInstanceOf(contactAddress).canCreateEntityMetadata(
      accountAddress,
      entityId,
    );
  }

  canUpdateEntityMetadata({
    contactAddress,
    accountAddress,
    entityId,
  }: EntityMetadataCrudAclRequest): Promise<boolean> {
    return this.contractInstanceOf(contactAddress).canUpdateEntityMetadata(
      accountAddress,
      entityId,
    );
  }

  canDeleteEntityMetadata({
    contactAddress,
    accountAddress,
    entityId,
  }: EntityMetadataCrudAclRequest): Promise<boolean> {
    return this.contractInstanceOf(contactAddress).canDeleteEntityMetadata(
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
