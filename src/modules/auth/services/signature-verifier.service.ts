export interface IsSignatureValidRequest {
  accountAddress: string;
  message: string;
  signedMessage: string;
}

export abstract class SignatureVerifierService {
  abstract isSignatureValid(request: IsSignatureValidRequest): boolean;
}
