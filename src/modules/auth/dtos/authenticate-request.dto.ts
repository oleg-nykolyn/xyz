import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEthereumAddress } from 'class-validator';

export class AuthenticateRequestDto {
  @ApiProperty({
    example: '0x610178da211fef7d417bc0e6fed39f05609ad788',
  })
  @IsNotEmpty()
  @IsEthereumAddress()
  accountAddress: string;

  @ApiProperty({
    example: '0x4f790337e6c96d40f9dbca14440c1f91a747bd4011c26f4c728f7c3a2250b9',
  })
  @IsNotEmpty()
  signedNonce: string;
}
