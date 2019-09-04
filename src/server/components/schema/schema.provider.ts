import { Provider } from '@nestjs/common';
import { GraphQLFactory, GqlModuleOptions } from '@nestjs/graphql';
import { SchemaLink } from 'apollo-link-schema';

// import { createSchemaLink } from '@/server/customs/schema.link';
import { SCHEMA_LINK } from '@/server/utils/constants';

export const SchemaProvider: Provider = {
  provide: SCHEMA_LINK,
  inject: ['GqlModuleOptions'],
  useFactory: async (gqlFactory: GraphQLFactory, opts: GqlModuleOptions) => {
    const { schema } = await gqlFactory.mergeOptions(opts);
    if (!schema) {
      throw new Error('undefined schema');
    }
    return new SchemaLink({ schema });
  },
};
