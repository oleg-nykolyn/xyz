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

export class MetadataIdDto {
  @IsNotEmpty()
  @IsEnum(Chain)
  chain: Chain;

  @IsNotEmpty()
  @IsEthereumAddress()
  contractAddress: string;

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
  id: MetadataIdDto;
  content: any;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
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
