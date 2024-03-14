import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from './services/token.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: TokenService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const jwt = request.cookies?.jwt;

    if (!jwt) {
      throw new TokenRequiredException();
    }

    try {
      const payload = this.jwtService.verifyToken(jwt);
      request.accountAddress = payload.sub;
    } catch {
      throw new InvalidOrExpiredTokenException();
    }

    return true;
  }
}

class InvalidOrExpiredTokenException extends UnauthorizedException {
  constructor() {
    super();
  }
}

class TokenRequiredException extends UnauthorizedException {
  constructor() {
    super();
  }
}
