import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Chain } from 'src/modules/acl/services/emca.service';

@Injectable()
export class ParseChainPipe implements PipeTransform {
  transform(value: any) {
    const chains = Object.values(Chain);
    value = value?.toLowerCase?.();

    if (chains.includes(value)) {
      return value;
    }

    throw new BadRequestException(
      `chain must be one of the following values: ${chains.join(', ')}`,
    );
  }
}
