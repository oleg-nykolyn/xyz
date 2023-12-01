import { LogLevel } from '@nestjs/common';

export class EnvUtils {
  static getOrDefault(key: string, defaultValue: string): string {
    return process.env[key] || defaultValue;
  }

  static environmentType(): 'development' | 'production' {
    if (process.env.NODE_ENV === 'production') {
      return 'production';
    }

    return 'development';
  }

  static port(): number {
    return parseInt(process.env.PORT || '3000', 10);
  }

  static logLevel(): LogLevel {
    return (process.env.LOG_LEVEL as any) || 'log';
  }

  static dbHost(): string {
    return process.env.DB_HOST || 'localhost';
  }

  static dbPort(): number {
    return parseInt(process.env.DB_PORT || '5432', 10);
  }

  static dbName(): string {
    return process.env.DB_NAME || 'postgres-db';
  }

  static dbUser(): string {
    return process.env.DB_USER || 'postgres-user';
  }

  static dbPassword(): string {
    return process.env.DB_PASSWORD || 'postgres-password';
  }

  static jwtSecret(): string {
    return process.env.JWT_SECRET || '';
  }

  static jwtIssuer() {
    return process.env.JWT_ISSUER || 'xyz';
  }

  static jwtExpiresIn(): string | number {
    return process.env.JWT_EXPIRES_IN || '7d';
  }

  static hardhatRpcUrl(): string {
    return process.env.HARDHAT_RPC_URL || 'http://127.0.0.1:8545';
  }

  static ethereumRpcUrl(): string {
    return process.env.ETHEREUM_RPC_URL || 'https://ethereum.publicnode.com';
  }

  static polygonRpcUrl(): string {
    return process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com';
  }

  static multivacRpcUrl(): string {
    return process.env.MULTIVAC_RPC_URL || 'https://rpc.mtv.ac';
  }

  static throttleTtlSecs(): number {
    return parseInt(process.env.THROTTLE_TTL_SECS || '1', 10);
  }

  static throttleLimit(): number {
    return parseInt(process.env.THROTTLE_LIMIT || '5', 10);
  }
}
