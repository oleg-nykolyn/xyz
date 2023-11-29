import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthServiceImpl implements AuthService {
  issueNonce(accountAddress: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  authenticate(accountAddress: string, signedNonce: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
