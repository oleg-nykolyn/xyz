import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { MetadataIdDTO } from './metadata.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrUpdateMetadataRequestDTO {
  @ApiProperty()
  @ValidateNested()
  @Type(() => MetadataIdDTO)
  metadataId: MetadataIdDTO;

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
  @IsNotEmpty()
  @IsObject()
  metadataContent: any;
}
