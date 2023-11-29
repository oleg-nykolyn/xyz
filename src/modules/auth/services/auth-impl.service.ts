import { AuthService } from './auth.service';

export class AuthServiceImpl implements AuthService {
  getNonce(accountAddress: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  authenticate(accountAddress: string, signedNonce: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
