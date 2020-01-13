import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { BaseError as SequelizeError } from 'sequelize';

export interface F3DeskError {
  status?: HttpStatus;
  type?: 'ClassValidator' | 'Sequelize' | 'Http' | 'Other';
  message?: string;
  context?: any;
}

@Catch()
export class ErrorFormatter implements ExceptionFilter {
  public catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse();

    let formatted: F3DeskError = {};

    if (error instanceof SequelizeError) {
      formatted = this.isSequelize(error);
    } else if (error?.message?.message?.[0] instanceof ValidationError) {
      formatted = this.isClassValidator(error.message.message as ValidationError[]);
    } else if (error instanceof HttpException) {
      formatted = this.isHttp(error);
    } else {
      formatted.type = 'Other';
      formatted = error;
    }

    return res.status(formatted.status || 400).send(this.removeContext(formatted));
  }

  private removeContext = (formatted: F3DeskError) => {
    if (process.env.NODE_ENV === 'production') {
      delete formatted.context;
      return formatted;
    }

    return formatted;
  };

  private isClassValidator = (error: ValidationError[]) => {
    const formatted: F3DeskError = {};

    const firstProperty = error[0].property;
    const firstConstraint = error[0].constraints[Object.keys(error[0].constraints)[0]];

    formatted.type = 'ClassValidator';
    formatted.status = HttpStatus.BAD_REQUEST;
    formatted.message = `${firstProperty}:${firstConstraint}`;
    formatted.context = error;

    return formatted as Error;
  };

  private isHttp = (error: HttpException) => {
    const formatted: F3DeskError = {};

    formatted.type = 'Http';
    formatted.status = error.getStatus();
    formatted.message =
      typeof error.message.message === 'object' ? error.message.message.message : error.message.message;
    formatted.context = error.stack;

    return formatted;
  };

  private isSequelize = (error: SequelizeError) => {
    const formatted: F3DeskError = {};

    console.log(error); // eslint-disable-line

    formatted.type = 'Sequelize';
    formatted.status = HttpStatus.BAD_REQUEST;
    formatted.message = error.message;
    formatted.context = error.stack;

    return formatted;
  };
}
