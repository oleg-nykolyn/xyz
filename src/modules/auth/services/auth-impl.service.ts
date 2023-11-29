import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DataSource } from 'typeorm';
import { Account } from '../entities/account.entity';
import { v4 as uuidv4 } from 'uuid';
import { AccountRepository } from '../repositories/account.repository';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly accountRepository: AccountRepository,
  ) {}

  issueNonce(accountAddress: string): Promise<string> {
    return this.dataSource.transaction(async (manager) => {
      const account = await this.accountRepository.findByAddress(
        manager,
        accountAddress,
      );

      if (account) {
        return account.nonce;
      }

      const newAccount = new Account();
      newAccount.address = accountAddress;
      newAccount.nonce = uuidv4();

      await this.accountRepository.save(manager, newAccount);

      return newAccount.nonce;
    });
  }

  authenticate(accountAddress: string, signedNonce: string): Promise<string> {
    return Promise.resolve(`${accountAddress} ${signedNonce}`);
  }
}
