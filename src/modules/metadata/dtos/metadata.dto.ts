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

export class MetadataIdDTO {
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

  static fromDomain(metadataId: MetadataId): MetadataIdDTO {
    const dto = new MetadataIdDTO();

    dto.chain = metadataId.getChain();
    dto.contractAddress = metadataId.getContractAddress();
    dto.entityId = metadataId.getEntityId();

    return dto;
  }

  static toDomain(metadataIdDTO: MetadataIdDTO): MetadataId {
    return MetadataId.of({
      chain: metadataIdDTO.chain,
      contractAddress: metadataIdDTO.contractAddress,
      entityId: metadataIdDTO.entityId,
    });
  }
}

export class MetadataDTO {
  @ApiProperty()
  id: MetadataIdDTO;

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
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
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

  static fromDomain(metadata: Metadata): MetadataDTO {
    const dto = new MetadataDTO();

    dto.id = MetadataIdDTO.fromDomain(metadata.getId());
    dto.content = metadata.getContent();
    dto.createdAt = metadata.getCreatedAt();
    dto.updatedAt = metadata.getUpdatedAt();
    dto.createdBy = metadata.getCreatedBy();
    dto.lastUpdatedBy = metadata.getLastUpdatedBy();

    return dto;
  }
}

export type ViewableOrObscuredMetadataDTO = MetadataDTO | MetadataIdDTO;

export class MetadataDTOMappers {
  static mapViewableOrObscuredMetadataFromDomain(
    viewableOrObscuredMetadata: ViewableOrObscuredMetadata,
  ): ViewableOrObscuredMetadataDTO {
    if (viewableOrObscuredMetadata instanceof Metadata) {
      return MetadataDTO.fromDomain(viewableOrObscuredMetadata);
    }

    return MetadataIdDTO.fromDomain(viewableOrObscuredMetadata);
  }
}
