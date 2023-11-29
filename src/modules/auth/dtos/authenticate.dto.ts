import { IsNotEmpty, IsEthereumAddress } from 'class-validator';

export class AuthenticateDto {
  @IsNotEmpty()
  @IsEthereumAddress()
  accountAddress: string;

  @IsNotEmpty()
  signedNonce: string;
}
