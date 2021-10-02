import { LogLevel } from '@nestjs/common/services/logger.service';

function getLogLevels(isProduction: boolean): LogLevel[] {
  if (isProduction) {
    return ['log', 'error', 'warn'];
  }
  return ['log', 'error', 'warn', 'debug', 'verbose'];
}

export default getLogLevels;