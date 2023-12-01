import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { MetadataExceptionsFilter } from './metadata-exceptions.filter';
import { MetadataService } from './services/metadata.service';
import { AccountAddress } from '../auth/decorators/account-address.decorator';
import { Chain } from '../acl/services/emca.service';
import { ParseChainPipe } from './pipes/parse-chain.pipe';
import { ParseEthAddressPipe } from './pipes/parse-eth-address.pipe';
import { ParseEntityIdPipe } from './pipes/parse-entity-id.pipe';

@Controller({
  version: '1',
  path: 'metadata',
})
@UseFilters(MetadataExceptionsFilter)
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get(':chain/:contractAddress/:entityId')
  async getMetadata(
    @Param('chain', ParseChainPipe) chain: Chain,
    @Param('contractAddress', ParseEthAddressPipe) contractAddress: string,
    @Param('entityId', ParseEntityIdPipe) entityId: number,
    @AccountAddress() accountAddress,
  ): Promise<any> {
    return {
      chain,
      contractAddress,
      entityId,
      accountAddress,
    };
  }
}
