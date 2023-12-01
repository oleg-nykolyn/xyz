import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isValidAddress } from 'ethereumjs-util';

@Injectable()
export class ParseEthAddressPipe implements PipeTransform {
  transform(value: any) {
    const address = value?.toLowerCase?.();

    if (isValidAddress(address)) {
      return address;
    }

    throw new BadRequestException(
      `Address ${address} is not a valid Ethereum-like address.`,
    );
  }
}
