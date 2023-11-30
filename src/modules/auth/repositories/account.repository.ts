import { EntityManager } from 'typeorm';
import { Account } from '../domain/account';

export abstract class AccountRepository {
  abstract findByAddress(
    entityManager: EntityManager,
    accountAddress: string,
  ): Promise<Account>;

  abstract saveOrUpdate(
    entityManager: EntityManager,
    account: Account,
  ): Promise<Account>;
}
