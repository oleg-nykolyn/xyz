import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DataSource } from 'typeorm';
import { Account } from '../entities/account.entity';
import { v4 as uuidv4 } from 'uuid';
import { AccountRepository } from '../repositories/account.repository';
import { SignatureVerifierService } from './signature-verifier.service';
import { JwtService } from './jwt.service';
import { AccountNotFoundException } from './exceptions/account-not-found.exception';
import { InvalidSignatureException } from './exceptions/invalid-signature.exception';

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
    const account = await this.accountRepository.findByAddress(
      this.dataSource.manager,
      accountAddress,
    );

    if (account) {
      return account.nonce;
    }

    return this.dataSource.transaction(async (manager) => {
      const newAccount = new Account();
      newAccount.address = accountAddress;
      newAccount.nonce = uuidv4();

      await this.accountRepository.saveOrUpdate(manager, newAccount);

      return newAccount.nonce;
    });
  }

  async authenticate(
    accountAddress: string,
    signedNonce: string,
  ): Promise<string> {
    const account = await this.accountRepository.findByAddress(
      this.dataSource.manager,
      accountAddress,
    );

    if (!account) {
      throw new AccountNotFoundException(accountAddress);
    }

    const isSignatureValid = this.signatureVerifierService.isSignatureValid({
      accountAddress,
      message: account.nonce,
      signedMessage: signedNonce,
    });

    if (!isSignatureValid) {
      throw new InvalidSignatureException();
    }

    return this.dataSource.transaction(async (manager) => {
      account.nonce = uuidv4();

      await this.accountRepository.saveOrUpdate(manager, account);

      return this.jwtService.issueToken(accountAddress);
    });
  }
}
