import { EnvUtils } from 'src/utils/env.utils';
import { JwtService } from './jwt.service';
import { sign, verify } from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class JwtServiceImpl implements JwtService {
  private readonly logger = new Logger(JwtServiceImpl.name);

  isTokenValid(token: string): boolean {
    try {
      verify(token, EnvUtils.jwtSecret());
      return true;
    } catch (_) {
      return false;
    }
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
