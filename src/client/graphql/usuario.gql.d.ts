declare module '@/client/graphql/usuario.gql' {
  import { DocumentNode } from 'graphql';

  const Login: DocumentNode;
  const FindAllUsuarios: DocumentNode;
  export { Login, FindAllUsuarios };
}
