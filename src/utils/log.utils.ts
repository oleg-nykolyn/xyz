import { LogLevel } from '@nestjs/common';
import { EnvUtils } from './env.utils';

const logLevels: LogLevel[] = [
  'fatal',
  'error',
  'warn',
  'log',
  'debug',
  'verbose',
];

export class LogUtils {
  static getSupportedLogLevels(): LogLevel[] {
    const logLevelIndex = logLevels.indexOf(EnvUtils.logLevel());

    if (logLevelIndex === -1) {
      return logLevels;
    }

    return logLevels.slice(0, logLevelIndex + 1);
  }
}
