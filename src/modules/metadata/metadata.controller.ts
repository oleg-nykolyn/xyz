import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MetadataExceptionsFilter } from './metadata-exceptions.filter';
import { MetadataService } from './services/metadata.service';
import { AccountAddress } from '../auth/decorators/account-address.decorator';
import { Chain } from '../acl/services/emca.service';
import { ParseChainPipe } from './pipes/parse-chain.pipe';
import { ParseEthAddressPipe } from './pipes/parse-eth-address.pipe';
import { ParseEntityIdPipe } from './pipes/parse-entity-id.pipe';
import {
  MetadataDtoMappers,
  MetadataIdDto,
  ViewableOrObscuredMetadataDto,
} from './dtos/metadata.dto';

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
  ): Promise<ViewableOrObscuredMetadataDto> {
    return MetadataDtoMappers.mapViewableOrObscuredMetadataFromDomain(
      await this.metadataService.getMetadata(accountAddress, {
        chain,
        contractAddress,
        entityId,
      }),
    );
  }

  @Delete()
  @UsePipes(ValidationPipe)
  deleteMetadata(
    @Body() metadataIdDto: MetadataIdDto,
    @AccountAddress() accountAddress,
  ): Promise<void> {
    return this.metadataService.deleteMetadata(
      accountAddress,
      MetadataIdDto.toDomain(metadataIdDto),
    );
  }
}
