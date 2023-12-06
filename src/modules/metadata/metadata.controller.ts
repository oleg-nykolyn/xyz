import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import { ParsePositiveOrZeroIntegerPipe } from './pipes/parse-zero-or-positive-integer.pipe';
import {
  MetadataDto,
  MetadataDtoMappers,
  MetadataIdDto,
  ViewableOrObscuredMetadataDto,
} from './dtos/metadata.dto';
import { CreateOrUpdateMetadataRequestDto } from './dtos/create-or-update-metadata-request.dto';
import { MetadataId } from './domain/metadata';
import { MetadataCountPerContractDto } from './dtos/metadata-count-per-contract.dto';
import { MetadataOperationDto } from './dtos/metadata-operation.dto';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('metadata')
@ApiCookieAuth()
@Controller({
  version: '1',
  path: 'metadata',
})
@UseFilters(MetadataExceptionsFilter)
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get()
  async findMetadata(
    @AccountAddress() accountAddress: string,
    @Query(
      'limit',
      ParsePositiveOrZeroIntegerPipe.of({
        fieldName: 'limit',
      }),
    )
    limit: number,
    @Query(
      'offset',
      ParsePositiveOrZeroIntegerPipe.of({
        fieldName: 'offset',
      }),
    )
    offset: number,
    @Query('chain', ParseChainPipe.optional()) chain?: Chain,
    @Query('contract-address', ParseEthAddressPipe.optional())
    contractAddress?: string,
  ): Promise<ViewableOrObscuredMetadataDto[]> {
    return (
      await this.metadataService.findMetadata({
        accountAddress,
        chain,
        contractAddress,
        limit,
        offset,
      })
    ).map(MetadataDtoMappers.mapViewableOrObscuredMetadataFromDomain);
  }

  @Get(':chain/:contractAddress/:entityId')
  async getMetadata(
    @AccountAddress() accountAddress: string,
    @Param('chain', ParseChainPipe) chain: Chain,
    @Param('contractAddress', ParseEthAddressPipe) contractAddress: string,
    @Param('entityId', ParsePositiveOrZeroIntegerPipe) entityId: number,
  ): Promise<MetadataDto> {
    return MetadataDto.fromDomain(
      await this.metadataService.getMetadata(
        accountAddress,
        MetadataId.of({
          chain,
          contractAddress,
          entityId,
        }),
      ),
    );
  }

  @Get(':chain/:contractAddress/:entityId/history')
  async getMetadataOperationHistory(
    @AccountAddress() accountAddress: string,
    @Param('chain', ParseChainPipe) chain: Chain,
    @Param('contractAddress', ParseEthAddressPipe) contractAddress: string,
    @Param('entityId', ParsePositiveOrZeroIntegerPipe) entityId: number,
    @Query(
      'limit',
      ParsePositiveOrZeroIntegerPipe.of({
        fieldName: 'limit',
      }),
    )
    limit: number,
    @Query(
      'offset',
      ParsePositiveOrZeroIntegerPipe.of({
        fieldName: 'offset',
      }),
    )
    offset: number,
  ): Promise<MetadataOperationDto[]> {
    return (
      await this.metadataService.getMetadataOperationHistory({
        accountAddress,
        metadataId: MetadataId.of({
          chain,
          contractAddress,
          entityId,
        }),
        limit,
        offset,
      })
    ).map(MetadataOperationDto.fromDomain);
  }

  @Get(':chain')
  async getMetadataCountPerContractByChain(
    @Param('chain', ParseChainPipe) chain: Chain,
    @Query(
      'limit',
      ParsePositiveOrZeroIntegerPipe.of({
        fieldName: 'limit',
      }),
    )
    limit: number,
    @Query(
      'offset',
      ParsePositiveOrZeroIntegerPipe.of({
        fieldName: 'offset',
      }),
    )
    offset: number,
  ): Promise<MetadataCountPerContractDto[]> {
    return this.metadataService.getMetadataCountPerContractByChain({
      chain,
      limit,
      offset,
    });
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createMetadata(
    @AccountAddress() accountAddress: string,
    @Body() { metadataId, metadataContent }: CreateOrUpdateMetadataRequestDto,
  ): Promise<MetadataDto> {
    return MetadataDto.fromDomain(
      await this.metadataService.createMetadata(
        accountAddress,
        MetadataIdDto.toDomain(metadataId),
        metadataContent,
      ),
    );
  }

  @Put()
  @UsePipes(ValidationPipe)
  async updateMetadata(
    @AccountAddress() accountAddress: string,
    @Body() { metadataId, metadataContent }: CreateOrUpdateMetadataRequestDto,
  ): Promise<MetadataDto> {
    return MetadataDto.fromDomain(
      await this.metadataService.updateMetadata(
        accountAddress,
        MetadataIdDto.toDomain(metadataId),
        metadataContent,
      ),
    );
  }

  @Delete()
  @UsePipes(ValidationPipe)
  deleteMetadata(
    @AccountAddress() accountAddress: string,
    @Body() metadataIdDto: MetadataIdDto,
  ): Promise<void> {
    return this.metadataService.deleteMetadata(
      accountAddress,
      MetadataIdDto.toDomain(metadataIdDto),
    );
  }
}
