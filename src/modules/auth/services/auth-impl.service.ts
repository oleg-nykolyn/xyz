import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthServiceImpl implements AuthService {
  issueNonce(accountAddress: string): Promise<string> {
    return Promise.resolve(accountAddress);
  }

  authenticate(accountAddress: string, signedNonce: string): Promise<string> {
    return Promise.resolve(`${accountAddress} ${signedNonce}`);
  }
}
