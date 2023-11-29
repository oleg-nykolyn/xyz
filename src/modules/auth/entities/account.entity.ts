import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryColumn()
  address: string;

  @Column()
  nonce: string;
}
