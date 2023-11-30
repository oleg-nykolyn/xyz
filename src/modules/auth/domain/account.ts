import { v4 as uuidv4 } from 'uuid';

export class Account {
  private constructor(
    private readonly address: string,
    private nonce: string,
  ) {}

  static ofAddress(address: string): Account {
    return new Account(address, uuidv4());
  }

  static of(address: string, nonce: string): Account {
    return new Account(address, nonce);
  }

  getAddress(): string {
    return this.address;
  }

  getNonce(): string {
    return this.nonce;
  }

  regenerateNonce(): void {
    this.nonce = uuidv4();
  }
}
