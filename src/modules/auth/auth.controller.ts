import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { IssueNonceRequestDto } from './dtos/issue-nonce-request.dto';
import { AuthenticateRequestDto } from './dtos/authenticate-request.dto';
import { EnvUtils } from 'src/utils/env.utils';
import { Response } from 'express';
import { AuthExceptionsFilter } from './auth-exceptions.filter';
import { Public } from './decorators/public.decorator';

@Controller({
  version: '1',
  path: 'auth',
})
@Public()
@UseFilters(AuthExceptionsFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('issue-nonce')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async issueNonce(@Body() { accountAddress }: IssueNonceRequestDto) {
    return this.authService.issueNonce(accountAddress);
  }

  @Post('authenticate')
  @UsePipes(ValidationPipe)
  async authenticate(
    @Body() { accountAddress, signedNonce }: AuthenticateRequestDto,
    @Res() response: Response,
  ) {
    const jwt = await this.authService.authenticate(
      accountAddress,
      signedNonce,
    );

    response.cookie('jwt', jwt, {
      httpOnly: true,
      secure: EnvUtils.environmentType() === 'production',
    });

    return response.status(HttpStatus.OK).send();
  }
}
