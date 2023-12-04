import { NullUtils } from 'src/utils/null.utils';
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
    dto.metadataContent = NullUtils.mapToUndefinedIfAbsent(
      metadataOperation.getMetadataContent(),
    );

    return dto;
  }
}
