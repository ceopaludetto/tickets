import { Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';

import { ContextType, Erro } from '@/server/utils/common.dto';

@Catch()
export class ExceptionFilter implements GqlExceptionFilter {
  public catch = (exception: HttpException, host: ArgumentsHost) => {
    const GraphQLHost = GqlArgumentsHost.create(host);
    const { res } = GraphQLHost.getContext<ContextType>();
    const error: Erro = {
      status: 500,
      error: 'Internal Server Error',
      message: 'Falha no servidor',
    };

    const isHttp = exception instanceof HttpException;
    if (isHttp) {
      error.status = exception.getStatus();

      if (exception.message.error) {
        error.error = exception.message.error;
      }
      if (exception.message.message) {
        const errorKeys = Object.keys(exception.message.message[0].constraints);
        error.message = exception.message.message[0].constraints[errorKeys[0]];
      }
    } else {
      const parsed = JSON.parse(exception.message.replace('Error: ', ''));
      if (parsed) {
        error.status = parsed.status;
        error.message = parsed.response.message;
        error.error = parsed.response.error;
      }
    }

    return res
      .status(error.status)
      .send(error)
      .end();
  };
}
