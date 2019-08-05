import { registerEnumType } from 'type-graphql';
import { RolesBuilder } from 'nest-access-control';

export enum Permissao {
  User = 'USER',
  Suporte = 'SUPORTE',
  Analista = 'ANALISTA',
  Coordenador = 'COORDENADOR',
  Gerente = 'GERENTE',
  Diretor = 'DIRETOR',
  ConsultorExterno = 'CONSULTOR_EXTERNO',
  VIP = 'VIP',
}

registerEnumType(Permissao, {
  name: 'Permissao',
});

export enum Recurso {
  Perfil = 'PERFIL',
  Chamados = 'CHAMADOS',
  Inventario = 'INVENTARIO',
  Relatorio = 'RELATORIO',
  Saldo = 'SALDO',
}

export const Roles = new RolesBuilder();

Roles.grant(Permissao.User) // === Usuário final ===
  .readOwn(Recurso.Chamados) // Lê seus próprios chamados
  .createOwn(Recurso.Chamados) // Cria seus chamados
  .updateOwn(Recurso.Chamados) // Atualiza seus chamados
  .deleteOwn(Recurso.Chamados) // Deleta seus chamados(não é uma exclusão real, apenas torna invísivel)
  .createOwn(Recurso.Perfil) // Cria seu próprio perfil
  .updateOwn(Recurso.Perfil) // Atualiza seu próprio perfil
  .deleteOwn(Recurso.Perfil) // Exclui seu próprio perfil
  .grant(Permissao.Suporte) // === Suporte ===
  .createOwn(Recurso.Perfil) // Cria seu próprio perfil
  .updateOwn(Recurso.Perfil) // Atualiza seu próprio perfil
  .deleteOwn(Recurso.Perfil) // Exclui seu próprio perfil
  .readAny(Recurso.Chamados) // Lê qualquer chamado
  .updateAny(Recurso.Chamados) // Atualiza qualquer chamado(isso eu não tenho certeza!!)
  .createAny(Recurso.Inventario) // Cria qualquer inventário
  .updateAny(Recurso.Inventario) // Atualiza qualquer inventário
  .deleteAny(Recurso.Inventario) // Exclui qualquer inventário
  .grant(Permissao.Analista) // === Analista ===
  .inherit(Permissao.Suporte) // Analista tem todas as permissões de suporte
  .readAny(Recurso.Relatorio) // Lê qualquer relatório
  .createOwn(Recurso.Relatorio) // Cria seus próprios relatórios
  .updateOwn(Recurso.Relatorio) // Atualiza seus próprios relatórios
  .deleteOwn(Recurso.Relatorio) // Exclui seus próprios relatórios(não decidi esse, mas acho melhor não dar pra excluir relatorio)
  .grant(Permissao.Coordenador) // === Coordenador ===
  .inherit(Permissao.Analista) // Coordenador tem todas as permissões de analista
  .updateAny(Recurso.Relatorio) // Atualiza qualquer relatório
  .lock();
