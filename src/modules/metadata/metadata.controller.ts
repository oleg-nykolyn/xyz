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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

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

  @ApiOperation({
    description:
      'Returns the metadata associated with the given chain, contract address and entity ID.',
  })
  @ApiOkResponse({
    description: 'The metadata has been successfully returned.',
    type: MetadataDto,
  })
  @ApiNotFoundResponse({
    description: 'The metadata is not found.',
  })
  @ApiUnauthorizedResponse({
    description:
      'The user is not authenticated or authorized to view the requested metadata.',
  })
  @ApiBadRequestResponse({
    description: 'The request parameters are invalid.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiParam({
    name: 'chain',
    enum: Chain,
  })
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

  @ApiOperation({
    description:
      'Creates new metadata associated with the given chain, contract address and entity ID.',
  })
  @ApiCreatedResponse({
    description: 'The metadata has been successfully created.',
    type: MetadataDto,
  })
  @ApiConflictResponse({
    description: 'The metadata associated with the given ID already exists.',
  })
  @ApiUnauthorizedResponse({
    description:
      'The user is not authenticated or authorized to create the metadata for the given chain, contract address and entity ID.',
  })
  @ApiBadRequestResponse({
    description: 'The request body is invalid.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
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

  @ApiOperation({
    description:
      'Updates the metadata associated with the given chain, contract address and entity ID.',
  })
  @ApiOkResponse({
    description: 'The metadata has been successfully updated.',
    type: MetadataDto,
  })
  @ApiNotFoundResponse({
    description: 'The metadata is not found.',
  })
  @ApiUnauthorizedResponse({
    description:
      'The user is not authenticated or authorized to update the metadata for the given chain, contract address and entity ID.',
  })
  @ApiBadRequestResponse({
    description: 'The request body is invalid.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
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

  @ApiOperation({
    description:
      'Deletes the metadata associated with the given chain, contract address and entity ID.',
  })
  @ApiOkResponse({
    description: 'The metadata has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'The metadata is not found.',
  })
  @ApiUnauthorizedResponse({
    description:
      'The user is not authenticated or authorized to delete the metadata for the given chain, contract address and entity ID.',
  })
  @ApiBadRequestResponse({
    description: 'The request body is invalid.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
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
