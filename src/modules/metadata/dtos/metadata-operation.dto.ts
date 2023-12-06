import { NullUtils } from 'src/utils/null.utils';
import {
  MetadataOperation,
  MetadataOperationType,
} from '../domain/metadata-operation';
import { ApiProperty } from '@nestjs/swagger';

export class MetadataOperationDto {
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  id: string;

  @ApiProperty({
    enum: MetadataOperationType,
    example: MetadataOperationType.Create,
  })
  type: MetadataOperationType;

  @ApiProperty({
    example: new Date(),
  })
  executedAt: Date;

  @ApiProperty({
    example: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
  })
  executedBy: string;

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
