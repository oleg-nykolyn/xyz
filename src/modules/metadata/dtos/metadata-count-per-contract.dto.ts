import { ApiProperty } from '@nestjs/swagger';

export class MetadataCountPerContractDTO {
  @ApiProperty({
    example: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
  })
  contractAddress: string;

  @ApiProperty({
    example: 1,
  })
  metadataCount: number;
}
