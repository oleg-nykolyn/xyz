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
import { ParseChainPipe } from './pipes/parse-chain.pipe';
import { ParseEthAddressPipe } from './pipes/parse-eth-address.pipe';
import { ParsePositiveOrZeroIntegerPipe } from './pipes/parse-zero-or-positive-integer.pipe';
import {
  MetadataDTO,
  MetadataDTOMappers,
  MetadataIdDTO,
  ViewableOrObscuredMetadataDTO,
} from './dtos/metadata.dto';
import { CreateOrUpdateMetadataRequestDTO } from './dtos/create-or-update-metadata-request.dto';
import { MetadataId } from './domain/metadata';
import { MetadataCountPerContractDTO } from './dtos/metadata-count-per-contract.dto';
import { MetadataOperationDTO } from './dtos/metadata-operation.dto';
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
import { Chain } from './domain/chain';

@ApiTags('metadata')
@ApiCookieAuth()
@Controller({
  version: '1',
  path: 'metadata',
})
@UseFilters(MetadataExceptionsFilter)
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @ApiOperation({
    description:
      'Returns a list of metadata associated with the given pagination arguments, optional chain, and contract address. Each metadata entry has its content obscured or is fully viewable based on user permissions.',
  })
  @ApiOkResponse({
    description: 'The search results have been successfully returned.',
    schema: {
      type: 'array',
      items: {
        anyOf: [
          {
            $ref: '#/components/schemas/MetadataDTO',
          },
          {
            $ref: '#/components/schemas/MetadataIdDTO',
          },
        ],
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'The user is not authenticated.',
  })
  @ApiBadRequestResponse({
    description: 'The query parameters are invalid.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiParam({
    name: 'chain',
    enum: Chain,
    required: false,
  })
  @ApiParam({
    name: 'contract-address',
    required: false,
  })
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
  ): Promise<ViewableOrObscuredMetadataDTO[]> {
    return (
      await this.metadataService.findMetadata({
        accountAddress,
        chain,
        contractAddress,
        limit,
        offset,
      })
    ).map(MetadataDTOMappers.mapViewableOrObscuredMetadataFromDomain);
  }

  @ApiOperation({
    description:
      'Returns the metadata associated with the given chain, contract address and entity ID.',
  })
  @ApiOkResponse({
    description: 'The metadata has been successfully returned.',
    type: MetadataDTO,
  })
  @ApiNotFoundResponse({
    description: 'The metadata is not found.',
  })
  @ApiUnauthorizedResponse({
    description:
      'The user is not authenticated or authorized to view the requested metadata.',
  })
  @ApiBadRequestResponse({
    description: 'The query parameters are invalid.',
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
  ): Promise<MetadataDTO> {
    return MetadataDTO.fromDomain(
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

  @ApiOperation({
    description:
      'Returns the metadata operation history associated with the given chain, contract address and entity ID.',
  })
  @ApiOkResponse({
    description:
      'The metadata operation history has been successfully returned.',
    type: [MetadataOperationDTO],
  })
  @ApiUnauthorizedResponse({
    description:
      'The user is not authenticated or authorized to view the requested metadata operation history.',
  })
  @ApiBadRequestResponse({
    description: 'The query parameters are invalid.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiParam({
    name: 'chain',
    enum: Chain,
  })
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
  ): Promise<MetadataOperationDTO[]> {
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
    ).map(MetadataOperationDTO.fromDomain);
  }

  @ApiOperation({
    description:
      'Returns a list of contracts and their associated metadata count for the given chain and pagination arguments.',
  })
  @ApiOkResponse({
    description:
      'The list of contracts and their associated metadata count has been successfully returned.',
    type: [MetadataCountPerContractDTO],
  })
  @ApiUnauthorizedResponse({
    description: 'The user is not authenticated.',
  })
  @ApiBadRequestResponse({
    description: 'The query parameters are invalid.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiParam({
    name: 'chain',
    enum: Chain,
  })
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
  ): Promise<MetadataCountPerContractDTO[]> {
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
    type: MetadataDTO,
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
    @Body()
    {
      metadataId: metadataIdDTO,
      metadataContent,
    }: CreateOrUpdateMetadataRequestDTO,
  ): Promise<MetadataDTO> {
    return MetadataDTO.fromDomain(
      await this.metadataService.createMetadata(
        accountAddress,
        metadataIdDTO.toDomain(),
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
    type: MetadataDTO,
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
    @Body()
    {
      metadataId: metadataIdDTO,
      metadataContent,
    }: CreateOrUpdateMetadataRequestDTO,
  ): Promise<MetadataDTO> {
    return MetadataDTO.fromDomain(
      await this.metadataService.updateMetadata(
        accountAddress,
        metadataIdDTO.toDomain(),
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
    @Body() metadataIdDTO: MetadataIdDTO,
  ): Promise<void> {
    return this.metadataService.deleteMetadata(
      accountAddress,
      metadataIdDTO.toDomain(),
    );
  }
}
