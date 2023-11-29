import { EntityManager } from 'typeorm';
import { Account } from '../entities/account.entity';
import { AccountRepository } from './account.repository';

export class AccountRepositoryImpl extends AccountRepository {
  findByAddress(
    entityManager: EntityManager,
    accountAddress: string,
  ): Promise<Account> {
    return entityManager.findOneBy(Account, { address: accountAddress });
  }

  saveOrUpdate(
    entityManager: EntityManager,
    account: Account,
  ): Promise<Account> {
    return entityManager.save(account);
  }
}
