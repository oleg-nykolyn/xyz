import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { IssueNonceDto } from './dtos/issue-nonce.dto';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { Env } from 'src/utils/env';
import { Response } from 'express';
import { InvalidSignatureException } from './services/exceptions/invalid-signature.exception';
import { AccountNotFoundException } from './services/exceptions/account-not-found.exception';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('issue-nonce')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async issueNonce(@Body() { accountAddress }: IssueNonceDto) {
    return this.authService.issueNonce(accountAddress);
  }

  @Post('authenticate')
  @UsePipes(ValidationPipe)
  async authenticate(
    @Body() { accountAddress, signedNonce }: AuthenticateDto,
    @Res() response: Response,
  ) {
    try {
      const jwt = await this.authService.authenticate(
        accountAddress,
        signedNonce,
      );

      response.cookie('jwt', jwt, {
        httpOnly: true,
        secure: Env.environmentType() === 'production',
      });

      return response.status(HttpStatus.OK).send();
    } catch (exception) {
      if (exception instanceof AccountNotFoundException) {
        return response.status(HttpStatus.NOT_FOUND).send(exception.message);
      }

      if (exception instanceof InvalidSignatureException) {
        return response
          .status(HttpStatus.PRECONDITION_FAILED)
          .send(exception.message);
      }

      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(exception.message);
    }
  }
}
