import { Module } from '@nestjs/common';
import { JwtService } from './services/jwt.service';
import { JwtServiceImpl } from './services/jwt-impl.service';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthServiceImpl } from './services/auth-impl.service';
import { AccountRepository } from './repositories/account.repository';
import { AccountRepositoryImpl } from './repositories/account-impl.repository';
import { SignatureVerifierService } from './services/signature-verifier.service';
import { SignatureVerifierServiceImpl } from './services/signature-verifier-impl.service';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
    {
      provide: AccountRepository,
      useClass: AccountRepositoryImpl,
    },
    {
      provide: JwtService,
      useClass: JwtServiceImpl,
    },
    {
      provide: SignatureVerifierService,
      useClass: SignatureVerifierServiceImpl,
    },
  ],
})
export class AuthModule {}
