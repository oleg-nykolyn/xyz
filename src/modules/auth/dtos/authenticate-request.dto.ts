import { IsNotEmpty, IsEthereumAddress } from 'class-validator';

export class AuthenticateRequestDto {
  @IsNotEmpty()
  @IsEthereumAddress()
  accountAddress: string;

  @IsNotEmpty()
  signedNonce: string;
}
