declare module '@/client/graphql/usuario.gql' {
  import { DocumentNode } from 'graphql';

  const Login: DocumentNode;
  const FindAllUsuarios: DocumentNode;
  const Profile: DocumentNode;
  export { Login, FindAllUsuarios, Profile };
}
