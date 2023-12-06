import { Chain } from 'src/modules/acl/services/emca.service';
import {
  Metadata,
  MetadataId,
  ViewableOrObscuredMetadata,
} from '../domain/metadata';
import {
  IsNotEmpty,
  IsEthereumAddress,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MetadataIdDto {
  @ApiProperty({
    enum: Chain,
    example: Chain.Ethereum,
  })
  @IsNotEmpty()
  @IsEnum(Chain)
  chain: Chain;

  @ApiProperty({
    example: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
  })
  @IsNotEmpty()
  @IsEthereumAddress()
  contractAddress: string;

  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  entityId: number;

  static fromDomain(metadataId: MetadataId): MetadataIdDto {
    const dto = new MetadataIdDto();

    dto.chain = metadataId.getChain();
    dto.contractAddress = metadataId.getContractAddress();
    dto.entityId = metadataId.getEntityId();

    return dto;
  }

  static toDomain(metadataIdDto: MetadataIdDto): MetadataId {
    return MetadataId.of({
      chain: metadataIdDto.chain,
      contractAddress: metadataIdDto.contractAddress,
      entityId: metadataIdDto.entityId,
    });
  }
}

export class MetadataDto {
  @ApiProperty()
  id: MetadataIdDto;

  @ApiProperty({
    example: {
      key: 'value',
      key2: 'value2',
      key3: {
        key4: 'value4',
        key5: ['value5', 'value6'],
      },
    },
  })
  content: any;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
  })
  createdBy: string;

  @ApiProperty({
    example: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
  })
  lastUpdatedBy: string;

  static fromDomain(metadata: Metadata): MetadataDto {
    const dto = new MetadataDto();

    dto.id = MetadataIdDto.fromDomain(metadata.getId());
    dto.content = metadata.getContent();
    dto.createdAt = metadata.getCreatedAt();
    dto.updatedAt = metadata.getUpdatedAt();
    dto.createdBy = metadata.getCreatedBy();
    dto.lastUpdatedBy = metadata.getLastUpdatedBy();

    return dto;
  }
}

export type ViewableOrObscuredMetadataDto = MetadataDto | MetadataIdDto;

export class MetadataDtoMappers {
  static mapViewableOrObscuredMetadataFromDomain(
    viewableOrObscuredMetadata: ViewableOrObscuredMetadata,
  ): ViewableOrObscuredMetadataDto {
    if (viewableOrObscuredMetadata instanceof Metadata) {
      return MetadataDto.fromDomain(viewableOrObscuredMetadata);
    }

    return MetadataIdDto.fromDomain(viewableOrObscuredMetadata);
  }
}
