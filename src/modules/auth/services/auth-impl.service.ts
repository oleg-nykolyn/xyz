import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DataSource } from 'typeorm';
import { AccountRepository } from '../repositories/account.repository';
import { SignatureVerifierService } from './signature-verifier.service';
import { JwtService } from './jwt.service';
import { AccountNotFoundException } from './exceptions/account-not-found.exception';
import { InvalidSignatureException } from './exceptions/invalid-signature.exception';
import { Account } from '../domain/account';

@Injectable()
export class AuthServiceImpl implements AuthService {
  private readonly logger = new Logger(AuthServiceImpl.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly accountRepository: AccountRepository,
    private readonly signatureVerifierService: SignatureVerifierService,
    private readonly jwtService: JwtService,
  ) {}

  async issueNonce(accountAddress: string): Promise<string> {
    try {
      const account = await this.accountRepository.findByAddress(
        this.dataSource.manager,
        accountAddress,
      );

      if (account) {
        return account.getNonce();
      }

      return await this.dataSource.transaction(async (manager) => {
        const newAccount = Account.ofAddress(accountAddress);

        await this.accountRepository.saveOrUpdate(manager, newAccount);

        return newAccount.getNonce();
      });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async authenticate(
    accountAddress: string,
    signedNonce: string,
  ): Promise<string> {
    try {
      const account = await this.accountRepository.findByAddress(
        this.dataSource.manager,
        accountAddress,
      );

      if (!account) {
        throw new AccountNotFoundException(accountAddress);
      }

      const isSignatureValid = this.signatureVerifierService.isSignatureValid({
        accountAddress,
        message: account.getNonce(),
        signedMessage: signedNonce,
      });

      if (!isSignatureValid) {
        throw new InvalidSignatureException();
      }

      return await this.dataSource.transaction(async (manager) => {
        account.regenerateNonce();

        await this.accountRepository.saveOrUpdate(manager, account);

        return this.jwtService.issueToken(accountAddress);
      });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
