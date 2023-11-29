import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthServiceImpl implements AuthService {
  getNonce(accountAddress: string): Promise<string> {
    return Promise.resolve('nonce');
  }

  authenticate(accountAddress: string, signedNonce: string): Promise<string> {
    return Promise.resolve('token');
  }
}
