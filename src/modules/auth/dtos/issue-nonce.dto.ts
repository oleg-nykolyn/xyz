import { IsNotEmpty, IsEthereumAddress } from 'class-validator';

export class IssueNonceDto {
  @IsNotEmpty()
  @IsEthereumAddress()
  accountAddress: string;
}
