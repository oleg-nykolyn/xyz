import { EntityManager } from 'typeorm';
import { AccountTypeOrmEntity } from './account.typeorm.entity';
import { AccountRepository } from '../account.repository';
import { Account } from '../../domain/account';

export class AccountRepositoryImplTypeOrm implements AccountRepository {
  async findByAddress(
    entityManager: EntityManager,
    accountAddress: string,
  ): Promise<Account | null> {
    const accountEntity = await entityManager.findOneBy(AccountTypeOrmEntity, {
      address: accountAddress,
    });

    if (!accountEntity) {
      return null;
    }

    return accountEntity.toDomain();
  }

  async saveOrUpdate(
    entityManager: EntityManager,
    account: Account,
  ): Promise<Account> {
    return (
      await entityManager.save(AccountTypeOrmEntity.fromDomain(account))
    ).toDomain();
  }
}
