import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseEntityIdPipe implements PipeTransform {
  transform(value: any) {
    try {
      const entityId = parseInt(value, 10);

      if (entityId >= 0) {
        return entityId;
      }

      throw new BadRequestException(
        `entity identifier ${value} must be a positive integer`,
      );
    } catch {
      throw new BadRequestException(
        `entity identifier ${value} is not a valid integer`,
      );
    }
  }
}
