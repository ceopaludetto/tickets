type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

enum AcaoEnum {
  Ler = 'Ler',
  Criar = 'Criar',
  Atualizar = 'Atualizar',
  Excluir = 'Excluir',
}

enum AnyOrOwnEnum {
  Any = 'Any',
  Own = 'Own',
}

type Associacao = {
  __typename?: 'Associacao';
  empresa: Empresa;
  perfil?: Maybe<Perfil>;
  tipo?: Maybe<AssociacaoEnum>;
};

enum AssociacaoEnum {
  Funcionario = 'Funcionario',
  Independente = 'Independente',
  Dono = 'Dono',
}

type AssociacaoInput = {
  empresa?: Maybe<Scalars['String']>;
  perfil?: Maybe<Scalars['String']>;
  tipo?: Maybe<AssociacaoEnum>;
};

enum DiaDePagamentoEnum {
  D7 = 'D7',
  D10 = 'D10',
  D15 = 'D15',
  D20 = 'D20',
}

type Empresa = {
  __typename?: 'Empresa';
  _id: Scalars['ID'];
  cnpj: Scalars['String'];
  razaoSocial: Scalars['String'];
  nomeFantasia: Scalars['String'];
  endereco: Scalars['String'];
  cep: Scalars['String'];
  telefone: Scalars['String'];
  site?: Maybe<Scalars['String']>;
  nomeCompleto?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  diaPagamento?: Maybe<DiaDePagamentoEnum>;
  planoHoras?: Maybe<PlanoDeHorasEnum>;
};

type EmpresaInput = {
  cnpj?: Maybe<Scalars['String']>;
  razaoSocial?: Maybe<Scalars['String']>;
  nomeFantasia?: Maybe<Scalars['String']>;
  endereco?: Maybe<Scalars['String']>;
  cep?: Maybe<Scalars['String']>;
  telefone?: Maybe<Scalars['String']>;
  site?: Maybe<Scalars['String']>;
  nomeCompleto?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  diaPagamento?: Maybe<DiaDePagamentoEnum>;
  planoHoras?: Maybe<PlanoDeHorasEnum>;
};

type Label = {
  __typename?: 'Label';
  _id: Scalars['ID'];
  descricao: Scalars['String'];
  cor: Scalars['String'];
};

type LabelInput = {
  descricao?: Maybe<Scalars['String']>;
  cor?: Maybe<Scalars['String']>;
};

type Mutation = {
  __typename?: 'Mutation';
  login: Usuario;
  register: Usuario;
  updateUsuario: Usuario;
  addEmpresa: Empresa;
  updateEmpresa: Empresa;
  addPerfil: Perfil;
  updatePerfil: Perfil;
  addTicket: Ticket;
  updateTicket: Ticket;
};

type MutationLoginArgs = {
  email: Scalars['String'];
  senha: Scalars['String'];
};

type MutationRegisterArgs = {
  input: UsuarioInput;
};

type MutationUpdateUsuarioArgs = {
  _id: Scalars['ID'];
  input: UsuarioInput;
};

type MutationAddEmpresaArgs = {
  input: EmpresaInput;
};

type MutationUpdateEmpresaArgs = {
  _id: Scalars['ID'];
  input: EmpresaInput;
};

type MutationAddPerfilArgs = {
  input: PerfilInput;
};

type MutationUpdatePerfilArgs = {
  _id: Scalars['ID'];
  input: PerfilInput;
};

type MutationAddTicketArgs = {
  input: TicketInput;
};

type MutationUpdateTicketArgs = {
  _id: Scalars['ID'];
  input: TicketInput;
};

type Perfil = {
  __typename?: 'Perfil';
  _id: Scalars['ID'];
  nome: Scalars['String'];
  descricao?: Maybe<Scalars['String']>;
  herda?: Maybe<Perfil>;
  politicas: Array<Politica>;
  empresa: Empresa;
};

type PerfilInput = {
  nome?: Maybe<Scalars['String']>;
  descricao?: Maybe<Scalars['String']>;
  herda?: Maybe<Scalars['String']>;
  empresa?: Maybe<Scalars['String']>;
  politicas?: Maybe<Array<PoliticaInput>>;
};

enum PlanoDeHorasEnum {
  H20 = 'H20',
  H40 = 'H40',
  H60 = 'H60',
  H80 = 'H80',
}

type Politica = {
  __typename?: 'Politica';
  _id: Scalars['ID'];
  recurso: RecursoEnum;
  acao: Array<AcaoEnum>;
  negacao?: Maybe<Scalars['Boolean']>;
  tipo: AnyOrOwnEnum;
};

type PoliticaInput = {
  recurso?: Maybe<RecursoEnum>;
  acao?: Maybe<Array<AcaoEnum>>;
  negacao?: Maybe<Scalars['Boolean']>;
  tipo?: Maybe<AnyOrOwnEnum>;
};

type Query = {
  __typename?: 'Query';
  profile: Usuario;
  findAllUsuarios: Array<Usuario>;
  findUsuario: Usuario;
  findAllEmpresas: Array<Empresa>;
  findEmpresa: Empresa;
  findAllPerfis: Array<Perfil>;
  findPerfil: Perfil;
  findAllTickets: Array<Ticket>;
  findTicket: Ticket;
  logged: Scalars['Boolean'];
  isDark: Scalars['Boolean'];
};

type QueryFindAllUsuariosArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

type QueryFindUsuarioArgs = {
  _id: Scalars['ID'];
};

type QueryFindAllEmpresasArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

type QueryFindEmpresaArgs = {
  _id: Scalars['ID'];
};

type QueryFindAllPerfisArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

type QueryFindPerfilArgs = {
  _id: Scalars['ID'];
};

type QueryFindAllTicketsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

type QueryFindTicketArgs = {
  _id: Scalars['ID'];
};

enum RecursoEnum {
  Usuario = 'Usuario',
  Empresa = 'Empresa',
  Perfil = 'Perfil',
}

type Subscription = {
  __typename?: 'Subscription';
  watchTickets: Ticket;
};

type Ticket = {
  __typename?: 'Ticket';
  _id: Scalars['ID'];
  nome: Scalars['String'];
  descricao: Scalars['String'];
  usuario: Usuario;
  status: TicketStatusEnum;
  labels?: Maybe<Array<Label>>;
};

type TicketInput = {
  nome?: Maybe<Scalars['String']>;
  descricao?: Maybe<Scalars['String']>;
  usuario?: Maybe<Scalars['ID']>;
  status?: Maybe<TicketStatusEnum>;
  labels?: Maybe<Array<LabelInput>>;
};

enum TicketStatusEnum {
  Completo = 'Completo',
  Pendente = 'Pendente',
  Verificacao = 'Verificacao',
}

type Usuario = {
  __typename?: 'Usuario';
  _id: Scalars['ID'];
  nome: Scalars['String'];
  sobrenome: Scalars['String'];
  email: Scalars['String'];
  senha: Scalars['String'];
  telefone?: Maybe<Scalars['String']>;
  nascimento: Scalars['DateTime'];
  associacoes: Array<Associacao>;
  sysAdmin: Scalars['Boolean'];
};

type UsuarioInput = {
  nome?: Maybe<Scalars['String']>;
  sobrenome?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  senha?: Maybe<Scalars['String']>;
  telefone?: Maybe<Scalars['String']>;
  nascimento?: Maybe<Scalars['DateTime']>;
  associacoes?: Maybe<Array<AssociacaoInput>>;
};
type EmpresaInfoFragment = { __typename?: 'Empresa'; _id: string; nomeFantasia: string; cnpj: string };

type AddEmpresaMutationVariables = {
  input: EmpresaInput;
};

type AddEmpresaMutation = { __typename?: 'Mutation'; addEmpresa: { __typename?: 'Empresa' } & EmpresaInfoFragment };

type FindEmpresaQueryVariables = {
  id: Scalars['ID'];
};

type FindEmpresaQuery = { __typename?: 'Query'; findEmpresa: { __typename?: 'Empresa' } & EmpresaInfoFragment };

type LoggedQueryVariables = {};

type LoggedQuery = { __typename?: 'Query'; logged: boolean };

type ThemeQueryVariables = {};

type ThemeQuery = { __typename?: 'Query'; isDark: boolean };

type TicketInfoFragment = {
  __typename?: 'Ticket';
  _id: string;
  nome: string;
  descricao: string;
  status: TicketStatusEnum;
  labels: Maybe<Array<{ __typename?: 'Label'; cor: string; descricao: string }>>;
};

type FindAllTicketsQueryVariables = {};

type FindAllTicketsQuery = {
  __typename?: 'Query';
  findAllTickets: Array<{ __typename?: 'Ticket' } & TicketInfoFragment>;
};

type UserInfoFragment = {
  __typename?: 'Usuario';
  _id: string;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: Maybe<string>;
  nascimento: any;
};

type ProfileQueryVariables = {};

type ProfileQuery = { __typename?: 'Query'; profile: { __typename?: 'Usuario' } & UserInfoFragment };

type RegisterMutationVariables = {
  input: UsuarioInput;
};

type RegisterMutation = { __typename?: 'Mutation'; register: { __typename?: 'Usuario' } & UserInfoFragment };

type LoginMutationVariables = {
  email: Scalars['String'];
  senha: Scalars['String'];
};

type LoginMutation = { __typename?: 'Mutation'; login: { __typename?: 'Usuario' } & UserInfoFragment };

type UpdateUsuarioMutationVariables = {
  id: Scalars['ID'];
  input: UsuarioInput;
};

type UpdateUsuarioMutation = { __typename?: 'Mutation'; updateUsuario: { __typename?: 'Usuario' } & UserInfoFragment };
