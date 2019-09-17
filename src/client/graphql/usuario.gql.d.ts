declare module '@/client/graphql/usuario.gql' {
  import { DocumentNode } from 'graphql';

  const Login: DocumentNode;
  const Profile: DocumentNode;
  const UpdateUsuario: DocumentNode;
  const Register: DocumentNode;
  export { Login, Profile, UpdateUsuario, Register };
}
