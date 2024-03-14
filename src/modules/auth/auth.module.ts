import { Module } from '@nestjs/common';
import { TokenService } from './services/token.service';
import { TokenServiceImplJwt } from './services/token-impl-jwt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthServiceImpl } from './services/auth-impl.service';
import { AccountRepository } from './repositories/account.repository';
import { AccountRepositoryImplTypeOrm } from './repositories/typeorm/account-impl-typeorm.repository';
import { SignatureVerifierService } from './services/signature-verifier.service';
import { SignatureVerifierServiceImpl } from './services/signature-verifier-impl.service';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
    {
      provide: AccountRepository,
      useClass: AccountRepositoryImplTypeOrm,
    },
    {
      provide: TokenService,
      useClass: TokenServiceImplJwt,
    },
    {
      provide: SignatureVerifierService,
      useClass: SignatureVerifierServiceImpl,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
