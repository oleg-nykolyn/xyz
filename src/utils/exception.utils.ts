import { HttpStatus, InternalServerErrorException } from '@nestjs/common';

export class ExceptionUtils {
  static extractExceptionMessage(exception: unknown): string {
    return (
      (exception as any).response?.message ||
      (exception as any).message ||
      'An unknown error occurred'
    );
  }

  static extractExceptionName(exception: unknown): string {
    return (exception as any).constructor?.name ?? 'Error';
  }

  static buildApiFacingExceptionNameAndMessage(
    statusCode: HttpStatus,
    exception,
  ) {
    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      return {
        statusCode,
        exception: InternalServerErrorException.name,
        message: 'The server encountered an internal error',
      };
    }

    return {
      statusCode,
      exception: ExceptionUtils.extractExceptionName(exception),
      message: ExceptionUtils.extractExceptionMessage(exception),
    };
  }
}
