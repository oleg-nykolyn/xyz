import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { MetadataIdDto } from './metadata.dto';
import { Type } from 'class-transformer';

export class CreateOrUpdateMetadataRequestDto {
  @ValidateNested()
  @Type(() => MetadataIdDto)
  metadataId: MetadataIdDto;

  @IsNotEmpty()
  @IsObject()
  metadataContent: any;
}
