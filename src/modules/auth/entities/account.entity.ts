import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from '../domain/account';

@Entity({ name: 'account' })
export class AccountEntity {
  @PrimaryColumn()
  address: string;

  @Column()
  nonce: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  static fromDomain(account: Account): AccountEntity {
    const accountEntity = new AccountEntity();
    accountEntity.address = account.getAddress();
    accountEntity.nonce = account.getNonce();
    accountEntity.createdAt = account.getCreatedAt();
    accountEntity.updatedAt = account.getUpdatedAt();

    return accountEntity;
  }

  toDomain(): Account {
    return Account.of({
      address: this.address,
      nonce: this.nonce,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }
}
