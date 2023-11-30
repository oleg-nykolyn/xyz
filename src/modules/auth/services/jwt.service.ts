import { JwtPayload } from 'jsonwebtoken';

export abstract class JwtService {
  abstract verifyToken(token: string): string | JwtPayload;

  abstract issueToken(subject: string): string;
}
