import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { IssueNonceDto } from './dtos/issue-nonce.dto';
import { AuthenticateDto } from './dtos/authenticate.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/issue-nonce')
  @UsePipes(ValidationPipe)
  async issueNonce(@Body() { accountAddress }: IssueNonceDto) {
    return this.authService.issueNonce(accountAddress);
  }

  @Post('/authenticate')
  @UsePipes(ValidationPipe)
  async authenticate(@Body() { accountAddress, signedNonce }: AuthenticateDto) {
    return this.authService.authenticate(accountAddress, signedNonce);
  }
}
