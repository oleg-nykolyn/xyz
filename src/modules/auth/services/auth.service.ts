export abstract class AuthService {
  abstract getNonce(accountAddress: string): Promise<string>;

  abstract authenticate(
    accountAddress: string,
    signedNonce: string,
  ): Promise<string>;
}
