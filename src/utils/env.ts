import { LogLevel } from '@nestjs/common';

export class EnvUtils {
  static getEnvironmentType(): 'development' | 'production' {
    if (process.env.NODE_ENV === 'development') {
      return 'development';
    }

    return 'production';
  }

  static getLogLevel(): LogLevel {
    return (process.env.LOG_LEVEL as any) || 'log';
  }

  static getPort(): string {
    return process.env.PORT || '3000';
  }
}
