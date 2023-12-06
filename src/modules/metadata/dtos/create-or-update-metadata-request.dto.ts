import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { MetadataIdDto } from './metadata.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrUpdateMetadataRequestDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => MetadataIdDto)
  metadataId: MetadataIdDto;

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
