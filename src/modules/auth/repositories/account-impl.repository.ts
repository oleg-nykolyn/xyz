import { EntityManager } from 'typeorm';
import { AccountEntity } from '../entities/account.entity';
import { AccountRepository } from './account.repository';
import { Account } from '../domain/account';

export class AccountRepositoryImpl implements AccountRepository {
  async findByAddress(
    entityManager: EntityManager,
    accountAddress: string,
  ): Promise<Account> {
    const accountEntity = await entityManager.findOneBy(AccountEntity, {
      address: accountAddress,
    });

    if (!accountEntity) {
      return null;
    }

    return Account.of(accountEntity.address, accountEntity.nonce);
  }

  async saveOrUpdate(
    entityManager: EntityManager,
    account: Account,
  ): Promise<Account> {
    await entityManager.save(AccountEntity.from(account));
    return account;
  }
}
