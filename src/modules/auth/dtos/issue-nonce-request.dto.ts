import { IsNotEmpty, IsEthereumAddress } from 'class-validator';

export class IssueNonceRequestDto {
  @IsNotEmpty()
  @IsEthereumAddress()
  accountAddress: string;
}
