import { v4 as uuidv4 } from 'uuid';

export class Account {
  private constructor(
    private readonly address: string,
    private nonce: string,
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date,
  ) {}

  static of({
    address,
    nonce = uuidv4(),
    createdAt,
    updatedAt,
  }: {
    address: string;
    nonce?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): Account {
    return new Account(address, nonce, createdAt, updatedAt);
  }

  getAddress(): string {
    return this.address;
  }

  getNonce(): string {
    return this.nonce;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  regenerateNonce(): void {
    this.nonce = uuidv4();
  }
}
