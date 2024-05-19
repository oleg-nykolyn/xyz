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
import { IssueNonceRequestDTO } from './dtos/issue-nonce-request.dto';
import { AuthenticateRequestDTO } from './dtos/authenticate-request.dto';
import { Env } from 'src/utils/env.utils';
import { Response } from 'express';
import { AuthExceptionsFilter } from './auth-exceptions.filter';
import { Public } from './decorators/public.decorator';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiPreconditionFailedResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { NonceDTO } from './dtos/nonce.dto';

@ApiTags('auth')
@Controller({
  version: '1',
  path: 'auth',
})
@Public()
@UseFilters(AuthExceptionsFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Issues a UUID nonce for the given account address.',
  })
  @ApiOkResponse({
    description: 'The nonce has been successfully issued.',
    type: NonceDTO,
  })
  @ApiBadRequestResponse({
    description: 'The account address is invalid.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Post('issue-nonce')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async issueNonce(
    @Body() { accountAddress }: IssueNonceRequestDTO,
  ): Promise<NonceDTO> {
    return NonceDTO.of(await this.authService.issueNonce(accountAddress));
  }

  @ApiOperation({
    description:
      'Returns a cookie that encapsulates a JWT to be used for access to secured API operations.',
  })
  @ApiOkResponse({
    description: 'The cookie has been successfully issued.',
  })
  @ApiPreconditionFailedResponse({
    description: 'The signature of the nonce is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'The account address is not found.',
  })
  @ApiBadRequestResponse({
    description: 'The request body is invalid.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Post('authenticate')
  @UsePipes(ValidationPipe)
  async authenticate(
    @Body() { accountAddress, signedNonce }: AuthenticateRequestDTO,
    @Res() response: Response,
  ) {
    const jwt = await this.authService.authenticate(
      accountAddress,
      signedNonce,
    );

    const isEnvProduction = Env.environmentType() === 'production';
    response.cookie('jwt', jwt, {
      httpOnly: true,
      sameSite: isEnvProduction,
      secure: isEnvProduction,
    });

    return response.status(HttpStatus.OK).send();
  }
}
