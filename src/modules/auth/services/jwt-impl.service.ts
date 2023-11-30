import { EnvUtils } from 'src/utils/env.utils';
import { JwtService } from './jwt.service';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class JwtServiceImpl implements JwtService {
  private readonly logger = new Logger(JwtServiceImpl.name);

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
