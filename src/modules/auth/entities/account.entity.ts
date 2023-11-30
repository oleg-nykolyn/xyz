import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Account } from '../domain/account';

@Entity({ name: 'account' })
export class AccountEntity {
  @PrimaryColumn()
  address: string;

  @Column()
  nonce: string;

  static from(account: Account): AccountEntity {
    const accountEntity = new AccountEntity();
    accountEntity.address = account.getAddress();
    accountEntity.nonce = account.getNonce();

    return accountEntity;
  }
}
