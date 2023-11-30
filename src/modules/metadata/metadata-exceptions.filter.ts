import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ExceptionUtils } from 'src/utils/exception.utils';
import { MetadataAlreadyExistsException } from './repositories/exceptions/metadata-already-exists.exception';
import { MetadataNotFoundException } from './repositories/exceptions/metadata-not-found.exception';
import { MetadataServiceException } from './services/exceptions/metadata-service.exception';

@Catch()
export class MetadataExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(MetadataExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof MetadataAlreadyExistsException) {
      statusCode = HttpStatus.CONFLICT;
    }

    if (exception instanceof MetadataNotFoundException) {
      statusCode = HttpStatus.NOT_FOUND;
    }

    if (exception instanceof MetadataServiceException) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const responseBody = {
      ...ExceptionUtils.buildApiFacingExceptionNameAndMessage(
        statusCode,
        exception,
      ),
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
