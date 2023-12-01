import { Chain } from 'src/modules/acl/services/emca.service';
import { Metadata, MetadataId } from '../domain/metadata';
import { ViewableOrObscuredMetadata } from '../services/metadata.service';

export class MetadataIdDto {
  chain: Chain;
  contractAddress: string;
  entityId: number;

  static fromDomain(metadataId: MetadataId): MetadataIdDto {
    const dto = new MetadataIdDto();

    dto.chain = metadataId.chain;
    dto.contractAddress = metadataId.contractAddress;
    dto.entityId = metadataId.entityId;

    return dto;
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