import { AuthenticationError } from 'apollo-server-express';

import {
  SecurityMatcherOptions,
  SecurityCustomMatcherOptions,
  Role,
  EmpresaDoc,
  PerfilDoc,
  AssociacaoDoc,
} from './security.dto';
import { AnyOrOwnEnum, AcaoEnum } from '@/server/models/politica/politica.dto';
import { AssociacaoEnum } from '@/server/models/associacao/associacao.dto';

export class SecurityMatcher {
  // Validador é chamado
  public async isRoleValid({
    usuario,
    role,
    empresa,
    args,
    isSameUser,
  }: SecurityMatcherOptions) {
    // Verifica se o usuário é sysAdmin
    if (usuario.sysAdmin) {
      return true;
    }

    // Procura a associacao que ele é dono da empresa do contexto
    const verifyIfIsOwner = usuario.associacoes.find(
      a =>
        (a.empresa as EmpresaDoc)._id.equals(empresa) &&
        a.tipo === AssociacaoEnum.Dono
    );

    // Se for dono da empresa, passa
    if (verifyIfIsOwner) {
      return true;
    }

    // Verifica se há empresa
    if (empresa) {
      // Captura a associacao do usuario com a empresa
      const assoc = usuario.associacoes.find(
        // eslint-disable-next-line no-underscore-dangle
        a => (a.empresa as EmpresaDoc)._id.equals(empresa)
      );

      // Se não há associacao entre os dois, retorna falso
      if (!assoc) {
        throw new AuthenticationError('Usuário não associado');
      }

      // Se há um customMatcher, verifica se sua verificacao é valida
      if (
        role.customMatcher &&
        !role.customMatcher(usuario, assoc as AssociacaoDoc, args)
      ) {
        throw new AuthenticationError('Comparação inválida');
      }

      // Faz as principais comparações
      return this.compare(assoc.perfil as PerfilDoc, role, isSameUser);
    }

    // Retorna falso, pois não há uma empresa no contexto
    throw new AuthenticationError('Empresa não encontrada');
  }

  public isCustomMatcherValid = ({
    usuario,
    args,
    customMatcher: { customMatcher, errorText },
  }: SecurityCustomMatcherOptions) => {
    if (!customMatcher(usuario, args)) {
      throw new AuthenticationError(errorText || 'Custom Matcher error');
    }

    return true;
  };

  private compare = (
    perfil: PerfilDoc,
    role: Role,
    isSameUser = false
  ): boolean => {
    // Procura a politica que possui o recurso e acao necessaria
    const politica = perfil.politicas.find(
      p =>
        this.verifyRole(p.acao as AcaoEnum[], role.acao) &&
        p.recurso === role.recurso
    );

    // Se há politica:
    if (politica) {
      // A politica é do tipo deny? Se sim, falso
      if (politica.negacao) {
        return false;
      }

      // Verifica se a politica é do tipo any, se for, valida a role tanto pra own quanto pra any
      if (
        politica.tipo === AnyOrOwnEnum.Any &&
        (role.tipo === AnyOrOwnEnum.Own || role.tipo === AnyOrOwnEnum.Any)
      ) {
        return true;
      }

      // Verifica se a politica é do tipo own, valida a role so pra own
      // Verifica entao se o usuario tenta alterar suas proprias informações, tanto pelo arg _id ou pelo seu _id de logado
      if (
        role.tipo === AnyOrOwnEnum.Own &&
        politica.tipo === AnyOrOwnEnum.Own &&
        isSameUser
      ) {
        return true;
      }
    }

    // Verifca se o perfil do usuario possui outros perfis acoplados e refaz a comparação até bater
    if (perfil.herda) {
      return this.compare(perfil.herda as PerfilDoc, role, isSameUser);
    }

    // Retorna falso
    return false;
  };

  private verifyRole = (pAcao: AcaoEnum[], rAcao: AcaoEnum) => {
    if (pAcao.includes(rAcao)) {
      return true;
    }

    if (
      rAcao === AcaoEnum.Ler &&
      (pAcao.includes(AcaoEnum.Criar) ||
        (pAcao.includes(AcaoEnum.Atualizar) ||
          pAcao.includes(AcaoEnum.Excluir)))
    ) {
      return true;
    }

    return false;
  };
}
