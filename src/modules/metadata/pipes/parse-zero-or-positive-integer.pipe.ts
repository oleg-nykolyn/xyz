import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

const numberRegex = /^\d+$/;

@Injectable()
export class ParsePositiveOrZeroIntegerPipe implements PipeTransform {
  private isOptional: boolean = false;
  private fieldName: string = 'value';

  static of({
    fieldName,
    isOptional = false,
  }: {
    fieldName: string;
    isOptional?: boolean;
  }) {
    const pipe = new ParsePositiveOrZeroIntegerPipe();
    pipe.isOptional = isOptional;
    pipe.fieldName = fieldName;
    return pipe;
  }

  transform(value: any) {
    if (this.isOptional && value === undefined) {
      return value;
    }

    if (!numberRegex.test(value)) {
      throw new BadRequestException(
        `${this.fieldName}=${value} is not a valid integer`,
      );
    }

    const entityId = parseInt(value, 10);

    if (entityId >= 0) {
      return entityId;
    }

    throw new BadRequestException(
      `${this.fieldName}=${value} must be a positive integer`,
    );
  }
}
