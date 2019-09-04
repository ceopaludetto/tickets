import path from 'path';
import { createLogger, transports } from 'winston';
import { LoggerService } from '@nestjs/common';

import { IS_PRODUCTION } from '@/server/utils/constants';
import { customFormat, fileFormat, fileJSONFormat } from './logger.dto';

export class Logger implements LoggerService {
  private winston = createLogger({
    transports: [
      new transports.File({
        level: 'debug',
        filename: path.resolve('logs', 'combined.log'),
        format: fileFormat,
      }),
      new transports.File({
        level: 'error',
        filename: path.resolve('logs', 'error.log'),
        format: fileFormat,
      }),
      new transports.File({
        level: 'debug',
        filename: path.resolve('logs', 'combined.log.json'),
        format: fileJSONFormat,
      }),
      new transports.File({
        level: 'error',
        filename: path.resolve('logs', 'error.log.json'),
        format: fileJSONFormat,
      }),
      ...(IS_PRODUCTION
        ? []
        : [
            new transports.Console({
              level: 'debug',
              format: customFormat,
            }),
          ]),
    ],
  });

  public log = (message: string) => {
    this.winston.info(message);
  };

  public error = (message: string) => {
    this.winston.error(message);
  };

  public warn = (message: string) => {
    this.winston.warn(message);
  };

  public debug = (message: string) => {
    this.winston.debug(message);
  };

  public verbose = (message: string) => {
    this.winston.verbose(message);
  };
}
