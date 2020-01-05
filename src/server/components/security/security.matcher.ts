import { UnauthorizedException } from '@nestjs/common';

import { AssociacaoEnum } from '@/server/models/associacao/associacao.dto';
import { EnumNivelAcesso, EnumTipoAcesso } from '@/server/models/politica';

import { SecurityMatcherOptions, SecurityCustomMatcherOptions, Role, Perfil } from './security.dto';

export class SecurityMatcher {
  // Validador é chamado
  public async isRoleValid({ usuario, role, empresa, args, isSameUser }: SecurityMatcherOptions) {
    // Verifica se o usuário é sysAdmin
    if (usuario.sysAdmin) {
      return true;
    }

    // Procura a associacao que ele é dono da empresa do contexto
    const verifyIfIsOwner = usuario.associacoes.find(a => a.empresa.id === empresa && a.tipo === AssociacaoEnum.Dono);

    // Se for dono da empresa, passa
    if (verifyIfIsOwner) {
      return true;
    }

    // Verifica se há empresa
    if (empresa) {
      // Captura a associacao do usuario com a empresa
      const assoc = usuario.associacoes.find(a => a.empresa.id === empresa);

      // Se não há associacao entre os dois, retorna falso
      if (!assoc) {
        throw new UnauthorizedException('Usuário não associado');
      }

      // Se há um customMatcher, verifica se sua verificacao é valida
      // if (role.customMatcher && !role.customMatcher(usuario, assoc as AssociacaoDoc, args)) {
      //   throw new UnauthorizedException('Comparação inválida');
      // }

      // Faz as principais comparações
      return this.compare(assoc.perfil, role, isSameUser);
    }

    // Retorna falso, pois não há uma empresa no contexto
    throw new UnauthorizedException('Empresa não encontrada');
  }

  public isCustomMatcherValid = ({
    usuario,
    args,
    customMatcher: { customMatcher, errorText },
  }: SecurityCustomMatcherOptions) => {
    if (!customMatcher(usuario, args)) {
      throw new UnauthorizedException(errorText || 'Custom Matcher error');
    }

    return true;
  };

  private compare = (perfil: Perfil, role: Role, isSameUser = false): boolean => {
    // Procura a politica que possui o recurso e acao necessaria
    const politica = perfil.politica.find(p => this.verifyRole(p.nivel, role.nivel) && p.recurso === role.recurso);

    // Se há politica:
    if (politica) {
      // A politica é do tipo deny? Se sim, falso
      if (politica.negacao) {
        return false;
      }

      // Verifica se a politica é do tipo any, se for, valida a role tanto pra own quanto pra any
      if (
        politica.tipo === EnumTipoAcesso.Qualquer &&
        (role.tipo === EnumTipoAcesso.Proprio || role.tipo === EnumTipoAcesso.Qualquer)
      ) {
        return true;
      }

      // Verifica se a politica é do tipo own, valida a role so pra own
      // Verifica entao se o usuario tenta alterar suas proprias informações, tanto pelo arg _id ou pelo seu _id de logado
      if (role.tipo === EnumTipoAcesso.Proprio && politica.tipo === EnumTipoAcesso.Proprio && isSameUser) {
        return true;
      }
    }

    // Verifca se o perfil do usuario possui outros perfis acoplados e refaz a comparação até bater
    if (perfil.herda) {
      return this.compare(perfil.herda, role, isSameUser);
    }

    // Retorna falso
    return false;
  };

  private verifyRole = (pAcao: EnumNivelAcesso[], rAcao: EnumNivelAcesso) => {
    if (pAcao.includes(rAcao)) {
      return true;
    }

    if (rAcao === EnumNivelAcesso.Excluir && pAcao.includes(EnumNivelAcesso.Escrever)) {
      return true;
    }

    if (
      rAcao === EnumNivelAcesso.Ler &&
      (pAcao.includes(EnumNivelAcesso.Escrever) || pAcao.includes(EnumNivelAcesso.Excluir))
    ) {
      return true;
    }

    return false;
  };
}
