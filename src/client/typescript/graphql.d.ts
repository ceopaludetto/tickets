export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export enum AcaoEnum {
  Ler = 'Ler',
  Criar = 'Criar',
  Atualizar = 'Atualizar',
  Excluir = 'Excluir'
}

export enum AnyOrOwnEnum {
  Any = 'Any',
  Own = 'Own'
}

export type Associacao = {
  __typename?: 'Associacao',
  empresa: Empresa,
  perfil?: Maybe<Perfil>,
  tipo?: Maybe<AssociacaoEnum>,
};

export enum AssociacaoEnum {
  Funcionario = 'Funcionario',
  Independente = 'Independente',
  Dono = 'Dono'
}

export type AssociacaoInput = {
  empresa?: Maybe<Scalars['String']>,
  perfil?: Maybe<Scalars['String']>,
  tipo?: Maybe<AssociacaoEnum>,
};

export enum DiaDePagamentoEnum {
  D7 = 'D7',
  D10 = 'D10',
  D15 = 'D15',
  D20 = 'D20'
}

export type Empresa = {
  __typename?: 'Empresa',
  _id: Scalars['ID'],
  cnpj: Scalars['String'],
  razaoSocial: Scalars['String'],
  nomeFantasia: Scalars['String'],
  endereco: Scalars['String'],
  cep: Scalars['String'],
  telefone: Scalars['String'],
  site?: Maybe<Scalars['String']>,
  nomeCompleto?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  diaPagamento?: Maybe<DiaDePagamentoEnum>,
  planoHoras?: Maybe<PlanoDeHorasEnum>,
};

export type EmpresaInput = {
  cnpj?: Maybe<Scalars['String']>,
  razaoSocial?: Maybe<Scalars['String']>,
  nomeFantasia?: Maybe<Scalars['String']>,
  endereco?: Maybe<Scalars['String']>,
  cep?: Maybe<Scalars['String']>,
  telefone?: Maybe<Scalars['String']>,
  site?: Maybe<Scalars['String']>,
  nomeCompleto?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  diaPagamento?: Maybe<DiaDePagamentoEnum>,
  planoHoras?: Maybe<PlanoDeHorasEnum>,
};

export type Label = {
  __typename?: 'Label',
  _id: Scalars['ID'],
  descricao: Scalars['String'],
  cor: Scalars['String'],
};

export type LabelInput = {
  descricao?: Maybe<Scalars['String']>,
  cor?: Maybe<Scalars['String']>,
};

export type Mutation = {
  __typename?: 'Mutation',
  login: Usuario,
  register: Usuario,
  updateUsuario: Usuario,
  addEmpresa: Empresa,
  updateEmpresa: Empresa,
  addPerfil: Perfil,
  updatePerfil: Perfil,
  addTicket: Ticket,
  updateTicket: Ticket,
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  senha: Scalars['String']
};


export type MutationRegisterArgs = {
  input: UsuarioInput
};


export type MutationUpdateUsuarioArgs = {
  _id: Scalars['ID'],
  input: UsuarioInput
};


export type MutationAddEmpresaArgs = {
  input: EmpresaInput
};


export type MutationUpdateEmpresaArgs = {
  _id: Scalars['ID'],
  input: EmpresaInput
};


export type MutationAddPerfilArgs = {
  input: PerfilInput
};


export type MutationUpdatePerfilArgs = {
  _id: Scalars['ID'],
  input: PerfilInput
};


export type MutationAddTicketArgs = {
  input: TicketInput
};


export type MutationUpdateTicketArgs = {
  _id: Scalars['ID'],
  input: TicketInput
};

export type Perfil = {
  __typename?: 'Perfil',
  _id: Scalars['ID'],
  nome: Scalars['String'],
  descricao?: Maybe<Scalars['String']>,
  herda?: Maybe<Perfil>,
  politicas: Array<Politica>,
  empresa: Empresa,
};

export type PerfilInput = {
  nome?: Maybe<Scalars['String']>,
  descricao?: Maybe<Scalars['String']>,
  herda?: Maybe<Scalars['String']>,
  empresa?: Maybe<Scalars['String']>,
  politicas?: Maybe<Array<PoliticaInput>>,
};

export enum PlanoDeHorasEnum {
  H20 = 'H20',
  H40 = 'H40',
  H60 = 'H60',
  H80 = 'H80'
}

export type Politica = {
  __typename?: 'Politica',
  _id: Scalars['ID'],
  recurso: RecursoEnum,
  acao: Array<AcaoEnum>,
  negacao?: Maybe<Scalars['Boolean']>,
  tipo: AnyOrOwnEnum,
};

export type PoliticaInput = {
  recurso?: Maybe<RecursoEnum>,
  acao?: Maybe<Array<AcaoEnum>>,
  negacao?: Maybe<Scalars['Boolean']>,
  tipo?: Maybe<AnyOrOwnEnum>,
};

export type Query = {
  __typename?: 'Query',
  profile: Usuario,
  findAllUsuarios: Array<Usuario>,
  findUsuario: Usuario,
  findAllEmpresas: Array<Empresa>,
  findEmpresa: Empresa,
  findAllPerfis: Array<Perfil>,
  findPerfil: Perfil,
  findAllTickets: Array<Ticket>,
  findTicket: Ticket,
  logged: Scalars['Boolean'],
  isDark: Scalars['Boolean'],
};


export type QueryFindAllUsuariosArgs = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>
};


export type QueryFindUsuarioArgs = {
  _id: Scalars['ID']
};


export type QueryFindAllEmpresasArgs = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>
};


export type QueryFindEmpresaArgs = {
  _id: Scalars['ID']
};


export type QueryFindAllPerfisArgs = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>
};


export type QueryFindPerfilArgs = {
  _id: Scalars['ID']
};


export type QueryFindAllTicketsArgs = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>
};


export type QueryFindTicketArgs = {
  _id: Scalars['ID']
};

export enum RecursoEnum {
  Usuario = 'Usuario',
  Empresa = 'Empresa',
  Perfil = 'Perfil'
}

export type Subscription = {
  __typename?: 'Subscription',
  watchTickets: Ticket,
};

export type Ticket = {
  __typename?: 'Ticket',
  _id: Scalars['ID'],
  nome: Scalars['String'],
  descricao: Scalars['String'],
  usuario: Usuario,
  status: TicketStatusEnum,
  labels?: Maybe<Array<Label>>,
};

export type TicketInput = {
  nome?: Maybe<Scalars['String']>,
  descricao?: Maybe<Scalars['String']>,
  usuario?: Maybe<Scalars['ID']>,
  status?: Maybe<TicketStatusEnum>,
  labels?: Maybe<Array<LabelInput>>,
};

export enum TicketStatusEnum {
  Completo = 'Completo',
  Pendente = 'Pendente',
  Verificacao = 'Verificacao'
}

export type Usuario = {
  __typename?: 'Usuario',
  _id: Scalars['ID'],
  nome: Scalars['String'],
  sobrenome: Scalars['String'],
  email: Scalars['String'],
  senha: Scalars['String'],
  cargo: Scalars['String'],
  associacoes: Array<Associacao>,
  sysAdmin: Scalars['Boolean'],
};

export type UsuarioInput = {
  nome?: Maybe<Scalars['String']>,
  sobrenome?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  cargo?: Maybe<Scalars['String']>,
  senha?: Maybe<Scalars['String']>,
  associacoes?: Maybe<Array<AssociacaoInput>>,
};
export type LoggedQueryVariables = {};


export type LoggedQuery = { __typename?: 'Query', logged: boolean };

export type ThemeQueryVariables = {};


export type ThemeQuery = { __typename?: 'Query', isDark: boolean };

export type FindAllTicketsQueryVariables = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>
};


export type FindAllTicketsQuery = { __typename?: 'Query', findAllTickets: Array<{ __typename?: 'Ticket', _id: string, nome: string, descricao: string, labels: Maybe<Array<{ __typename?: 'Label', _id: string, descricao: string, cor: string }>> }> };

export type FindAllUsuariosQueryVariables = {
  skip: Scalars['Int'],
  take: Scalars['Int']
};


export type FindAllUsuariosQuery = { __typename?: 'Query', findAllUsuarios: Array<{ __typename?: 'Usuario', _id: string, nome: string }> };

export type ProfileQueryVariables = {};


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'Usuario', _id: string, nome: string, sobrenome: string, email: string } };

export type LoginMutationVariables = {
  email: Scalars['String'],
  senha: Scalars['String']
};


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Usuario', _id: string, nome: string, sobrenome: string } };
