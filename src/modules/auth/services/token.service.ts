import { JwtPayload } from 'jsonwebtoken';

export abstract class TokenService {
  abstract verifyToken(token: string): string | JwtPayload;

  abstract issueToken(subject: string): string;
}
