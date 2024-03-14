import { EnvUtils } from 'src/utils/env.utils';
import { TokenService } from './token.service';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TokenServiceImplJwt implements TokenService {
  private readonly logger = new Logger(TokenServiceImplJwt.name);

  verifyToken(token: string): string | JwtPayload {
    return verify(token, EnvUtils.jwtSecret());
  }

  issueToken(subject: string): string {
    return sign(
      { sub: subject, iss: EnvUtils.jwtIssuer() },
      EnvUtils.jwtSecret(),
      {
        expiresIn: EnvUtils.jwtExpiresIn(),
      },
    );
  }
}
