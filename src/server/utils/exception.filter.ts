import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

import { IS_PRODUCTION } from '@/server/utils/constants';

interface Error {
  status?: HttpStatus;
  type?: 'ClassValidator' | 'Sequelize' | 'Runtime' | 'Http' | 'Other';
  message?: string;
  context?: any;
}

@Catch()
export class ErrorFormatter implements ExceptionFilter {
  public catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse();

    let formatted: Error = {};

    if (error.message.message[0] instanceof ValidationError) {
      formatted = this.isClassValidator(error.message.message as ValidationError[]);
    } else if (error instanceof HttpException) {
      formatted = this.isHttp(error);
    } else {
      formatted = error;
    }

    return res.status(formatted.status || 400).send(this.removeContext(formatted));
  }

  public removeContext = (formatted: Error) => {
    if (IS_PRODUCTION) {
      delete formatted.context;
      return formatted;
    }

    return formatted;
  };

  public isClassValidator = (error: ValidationError[]) => {
    const formatted: Error = {};

    const firstProperty = error[0].property;
    const firstConstraint = error[0].constraints[Object.keys(error[0].constraints)[0]];

    formatted.type = 'ClassValidator';
    formatted.status = HttpStatus.BAD_REQUEST;
    formatted.message = `${firstProperty}:${firstConstraint}`;
    formatted.context = error;

    return formatted as Error;
  };

  public isHttp = (error: HttpException) => {
    const formatted: Error = {};

    formatted.type = 'Http';
    formatted.status = error.getStatus();
    formatted.message =
      typeof error.message.message === 'object' ? error.message.message.message : error.message.message;
    formatted.context = error.stack;

    return formatted;
  };
}
