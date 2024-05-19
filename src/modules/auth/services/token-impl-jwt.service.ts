import { Env } from 'src/utils/env.utils';
import { TokenService } from './token.service';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TokenServiceImplJwt implements TokenService {
  private readonly logger = new Logger(TokenServiceImplJwt.name);

  verifyToken(token: string): string | JwtPayload {
    return verify(token, Env.jwtSecret());
  }

  issueToken(subject: string): string {
    return sign({ sub: subject, iss: Env.jwtIssuer() }, Env.jwtSecret(), {
      expiresIn: Env.jwtExpiresIn(),
    });
  }
}
