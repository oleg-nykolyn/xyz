import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

export class ExceptionUtils {
  static extractExceptionMessage(exception: unknown): string {
    if (exception instanceof BadRequestException) {
      return ((exception.getResponse() as any).message || [
        exception.message,
      ])[0];
    }

    return (exception as any).message || 'An unknown error occurred';
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
