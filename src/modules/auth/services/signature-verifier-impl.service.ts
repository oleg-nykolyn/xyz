import { Logger } from '@nestjs/common';
import { SignatureVerifierService } from './signature-verifier.service';
import {
  hashPersonalMessage,
  fromRpcSig,
  ecrecover,
  publicToAddress,
  bufferToHex,
} from 'ethereumjs-util';

export class SignatureVerifierServiceImpl implements SignatureVerifierService {
  private readonly logger = new Logger(SignatureVerifierServiceImpl.name);

  isSignatureValid({ accountAddress, message, signedMessage }): boolean {
    try {
      const { v, r, s } = fromRpcSig(signedMessage);
      const recoveredPublicKey = ecrecover(
        hashPersonalMessage(Buffer.from(message)),
        v,
        r,
        s,
      );
      const recoveredAddress = bufferToHex(publicToAddress(recoveredPublicKey));

      return recoveredAddress.toLowerCase() === accountAddress.toLowerCase();
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
