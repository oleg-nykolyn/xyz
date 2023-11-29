export class InvalidSignatureException extends Error {
  constructor() {
    super(`Invalid signature`);
  }
}
