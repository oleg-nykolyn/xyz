import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isValidAddress } from 'ethereumjs-util';

@Injectable()
export class ParseEthAddressPipe implements PipeTransform {
  private isOptional: boolean = false;

  static optional() {
    const pipe = new ParseEthAddressPipe();
    pipe.isOptional = true;
    return pipe;
  }

  transform(value: any) {
    if (this.isOptional && value === undefined) {
      return value;
    }

    const contractAddress = value?.toLowerCase?.().trim?.();

    if (isValidAddress(contractAddress)) {
      return contractAddress;
    }

    throw new BadRequestException(
      `contractAddress=${contractAddress} is not a valid eth-like address`,
    );
  }
}
