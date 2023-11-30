import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AccountNotFoundException } from './services/exceptions/account-not-found.exception';
import { InvalidSignatureException } from './services/exceptions/invalid-signature.exception';
import { ExceptionUtils } from 'src/utils/exception.utils';

@Catch()
export class AuthExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AuthExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof AccountNotFoundException) {
      httpStatus = HttpStatus.NOT_FOUND;
    }

    if (exception instanceof InvalidSignatureException) {
      httpStatus = HttpStatus.PRECONDITION_FAILED;
    }

    const responseBody = {
      statusCode: httpStatus,
      error: ExceptionUtils.extractExceptionName(exception),
      message: ExceptionUtils.extractExceptionMessage(exception),
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
