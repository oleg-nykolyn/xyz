import { LogLevel } from '@nestjs/common';
import { Env } from './env.utils';

const logLevels: LogLevel[] = [
  'fatal',
  'error',
  'log',
  'warn',
  'debug',
  'verbose',
];

export class LogUtils {
  static getSupportedLogLevels(): LogLevel[] {
    const logLevelIndex = logLevels.indexOf(Env.logLevel());

    if (logLevelIndex === -1) {
      return logLevels;
    }

    return logLevels.slice(0, logLevelIndex + 1);
  }
}
