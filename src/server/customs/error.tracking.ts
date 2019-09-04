/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from '@nestjs/common';
import { GraphQLExtension } from 'graphql-extensions';

import { ContextType, Erro } from '@/server/utils/common.dto';

export class ErrorTracking extends GraphQLExtension {
  public willSendResponse = (instance: any) => {
    const {
      context,
      graphqlResponse,
    }: { context: ContextType; graphqlResponse: any } = instance;

    if (graphqlResponse.errors && graphqlResponse.errors.length) {
      const errors: Erro[] = [];

      graphqlResponse.errors.forEach((e: any, i: number) => {
        const { message } = e;
        let status = 500;

        if (typeof message === 'object') {
          status = message.status || message.message.statusCode || 500;
          errors.push({
            status,
            error: message.message.error || message.error,
            message: message.message.message || message.message,
          });
        } else if (typeof message === 'string' && message.includes('Error: ')) {
          const erro = JSON.parse(message.replace('Error: ', ''));
          status = erro.message.statusCode || 500;
          errors.push({
            status,
            error: erro.message.error,
            message: erro.message.message,
          });
        } else {
          status =
            ((HttpStatus[e.extensions.code] as unknown) as number) || 500;
          errors.push({
            status,
            message,
            error: e.extensions.exception,
          });
        }
        if (i === 0) context.res.status(status);
      });

      return {
        ...instance,
        graphqlResponse: {
          ...instance.graphqlResponse,
          errors,
        },
      };
    }

    return instance;
  };
}
