import {
  MetadataOperation,
  MetadataOperationType,
} from '../domain/metadata-operation';

export class MetadataOperationDto {
  id: string;
  type: MetadataOperationType;
  executedAt: Date;
  executedBy: string;
  metadataContent: any;

  static fromDomain(
    metadataOperation: MetadataOperation,
  ): MetadataOperationDto {
    const dto = new MetadataOperationDto();

    dto.id = metadataOperation.getId();
    dto.type = metadataOperation.getType();
    dto.executedAt = metadataOperation.getExecutedAt();
    dto.executedBy = metadataOperation.getExecutedBy();
    dto.metadataContent = metadataOperation.getMetadataContent();

    return dto;
  }
}
