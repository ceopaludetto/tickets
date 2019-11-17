import { format } from 'winston';
import { format as dateFormat, parseISO } from 'date-fns';
import chalk from 'chalk';

import { APP_NAME } from '@/server/utils/constants';

const { combine, label, timestamp, printf, json } = format;

export type Colors = {
  info: (message: string) => string;
  error: (message: string) => string;
  warn: (message: string) => string;
  debug: (message: string) => string;
  verbose: (message: string) => string;
} & { [key: string]: (message: string) => string };

export const mapColors: Colors = {
  info: chalk.green,
  error: chalk.red,
  warn: chalk.yellow,
  debug: chalk.magenta,
  verbose: chalk.white,
};

export const genFormat = printf(
  ({ timestamp: time, label: l, level, message }) =>
    `[${chalk.whiteBright.bold(l)}, ${chalk.cyan(dateFormat(parseISO(time), 'dd/MM/yyyy - HH:mm:ss'))}] - ${mapColors[
      level
    ](level.toUpperCase())} : ${message}`
);

export const genFileFormat = printf(
  ({ timestamp: time, level, message }) =>
    `[${dateFormat(parseISO(time), 'dd/MM/yyyy - HH:mm:ss')}] - ${level.toUpperCase()} : ${message}`
);

export const customFormat = combine(label({ label: APP_NAME }), timestamp(), genFormat);

export const fileFormat = combine(timestamp(), genFileFormat);
export const fileJSONFormat = combine(timestamp(), json());
