import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEthereumAddress } from 'class-validator';

export class IssueNonceRequestDTO {
  @ApiProperty({
    example: '0x610178da211fef7d417bc0e6fed39f05609ad788',
  })
  @IsNotEmpty()
  @IsEthereumAddress()
  accountAddress: string;
}
