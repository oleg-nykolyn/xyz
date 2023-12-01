import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { MetadataExceptionsFilter } from './metadata-exceptions.filter';
import { MetadataService } from './services/metadata.service';
import { AccountAddress } from '../auth/decorators/account-address.decorator';

@Controller({
  version: '1',
  path: 'metadata',
})
@UseFilters(MetadataExceptionsFilter)
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get(':chain/:contractAddress/:entityId')
  async getMetadata(
    @Param() params: any,
    @AccountAddress() accountAddress,
  ): Promise<any> {
    const { chain, contractAddress, entityId } = params;

    return {
      chain,
      contractAddress,
      entityId,
      accountAddress,
    };
  }
}
