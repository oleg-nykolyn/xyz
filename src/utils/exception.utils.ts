import { BadRequestException } from '@nestjs/common';

export class ExceptionUtils {
  static extractExceptionMessage(exception: unknown): string {
    if (exception instanceof BadRequestException) {
      return ((exception.getResponse() as any).message || [
        exception.message,
      ])[0];
    }

    return (exception as any).message || 'An unknown error occurred';
  }
}
