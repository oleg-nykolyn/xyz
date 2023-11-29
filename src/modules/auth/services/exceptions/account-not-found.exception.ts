export class AccountNotFoundException extends Error {
  constructor(accountAddress: string) {
    super(`Account ${accountAddress} not found`);
  }
}
