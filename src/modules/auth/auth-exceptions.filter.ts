import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AccountNotFoundException } from './services/exceptions/account-not-found.exception';
import { InvalidSignatureException } from './services/exceptions/invalid-signature.exception';

@Catch()
export class AuthExceptionsFilter implements ExceptionFilter {
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
      message: (exception as any).message || 'An unknown error occurred',
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
