/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLExtension } from 'graphql-extensions';

import { ContextType } from '@/server/utils/common.dto';

export class ErrorTracking extends GraphQLExtension {
  public willSendResponse = (instance: any) => {
    const {
      context,
      graphqlResponse,
    }: { context: ContextType; graphqlResponse: any } = instance;

    if (graphqlResponse.errors && graphqlResponse.errors.length) {
      const error = graphqlResponse.errors[0];
      context.res.status(
        error.message.statusCode || error.message.status || 500
      );
    }

    return instance;
  };
}
