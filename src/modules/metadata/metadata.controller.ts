import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { MetadataExceptionsFilter } from './metadata-exceptions.filter';

@Controller({
  version: '1',
  path: 'metadata',
})
@UseFilters(MetadataExceptionsFilter)
export class MetadataController {
  @Get(':chain/:contractAddress/:entityId')
  async getMetadata(@Param() params: any): Promise<any> {
    const { chain, contractAddress, entityId } = params;
    console.log(`chain: ${chain}`);
    console.log(`contractAddress: ${contractAddress}`);
    console.log(`entityId: ${entityId}`);

    return {
      xyz: '🚀',
    };
  }
}
