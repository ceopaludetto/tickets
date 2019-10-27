import { Provider } from '@nestjs/common';
import { makeExecutableSchema, ITypeDefinitions } from 'apollo-server-express';
import { SchemaLink } from 'apollo-link-schema';

import typeDefs from '@/server/schema.gql';
import { SCHEMA_LINK } from '@/server/utils/constants';

export const SchemaProvider: Provider = {
  provide: SCHEMA_LINK,
  useFactory: () => {
    const schema = makeExecutableSchema({
      typeDefs: (typeDefs as unknown) as ITypeDefinitions,
    });
    if (!schema) {
      throw new Error('undefined schema');
    }
    return new SchemaLink({ schema });
  },
};
