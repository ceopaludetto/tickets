declare module '@/client/graphql/local.gql' {
  import { DocumentNode } from 'graphql';

  const Logged: DocumentNode;
  const Theme: DocumentNode;
  export { Logged, Theme };
}
