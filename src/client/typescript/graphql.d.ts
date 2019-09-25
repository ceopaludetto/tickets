
declare module '*/empresa.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const EmpresaInfo: DocumentNode;
export const AddEmpresa: DocumentNode;
export const FindEmpresa: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/local.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Logged: DocumentNode;
export const Theme: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/tickets.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const TicketInfo: DocumentNode;
export const FindAllTickets: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/usuario.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const UserInfo: DocumentNode;
export const Profile: DocumentNode;
export const Register: DocumentNode;
export const Login: DocumentNode;
export const UpdateUsuario: DocumentNode;

  export default defaultDocument;
}
    