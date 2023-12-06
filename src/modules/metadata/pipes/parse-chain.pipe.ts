import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Chain } from 'src/modules/acl/services/emca.service';

@Injectable()
export class ParseChainPipe implements PipeTransform {
  private isOptional: boolean = false;

  static optional() {
    const pipe = new ParseChainPipe();
    pipe.isOptional = true;
    return pipe;
  }

  transform(chainValue: any) {
    if (this.isOptional && chainValue === undefined) {
      return chainValue;
    }

    const chains = Object.values(Chain);
    chainValue = chainValue?.toUpperCase?.().trim?.();

    if (chains.includes(chainValue)) {
      return chainValue;
    }

    throw new BadRequestException(
      `chain=${chainValue} must be one of the following values: ${chains.join(
        ', ',
      )}`,
    );
  }
}
