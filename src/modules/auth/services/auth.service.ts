export abstract class AuthService {
  abstract issueNonce(accountAddress: string): Promise<string>;

  abstract authenticate(
    accountAddress: string,
    signedNonce: string,
  ): Promise<string>;
}
