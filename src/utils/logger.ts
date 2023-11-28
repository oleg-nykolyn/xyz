import { LogLevel } from '@nestjs/common';
import { EnvUtils } from './env';

const logLevels: LogLevel[] = [
  'fatal',
  'error',
  'log',
  'warn',
  'debug',
  'verbose',
];

export class LoggerUtils {
  static getSupportedLogLevels(): LogLevel[] {
    const logLevelIndex = logLevels.indexOf(EnvUtils.getLogLevel());

    if (logLevelIndex === -1) {
      return logLevels;
    }

    return logLevels.slice(0, logLevelIndex + 1);
  }
}
