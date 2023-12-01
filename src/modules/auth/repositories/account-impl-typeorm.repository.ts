import { EntityManager } from 'typeorm';
import { AccountEntity } from '../entities/account.entity';
import { AccountRepository } from './account.repository';
import { Account } from '../domain/account';

export class AccountRepositoryImplTypeOrm implements AccountRepository {
  async findByAddress(
    entityManager: EntityManager,
    accountAddress: string,
  ): Promise<Account | null> {
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
    return (
      await entityManager.save(AccountEntity.fromDomain(account))
    ).toDomain();
  }
}
