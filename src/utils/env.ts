import { LogLevel } from '@nestjs/common';

export class Env {
  static environmentType(): 'development' | 'production' {
    if (process.env.NODE_ENV === 'development') {
      return 'development';
    }

    return 'production';
  }

  static logLevel(): LogLevel {
    return (process.env.LOG_LEVEL as any) || 'log';
  }

  static port(): string {
    return process.env.PORT || '3000';
  }

  static rpcUrl(): string {
    return process.env.RPC_URL || 'http://localhost:8545';
  }

  static jwtSecret(): string {
    return process.env.JWT_SECRET || '';
  }
}
