import {
  SecurityMatcherOptions,
  Role,
  EmpresaInstance,
  PerfilInstance,
} from './security.dto';

import { AnyOrOwnEnum } from '@/server/models/politica/politica.dto';

export class SecurityMatcher {
  private compare = (
    perfil: PerfilInstance,
    role: Role,
    isSame: boolean = false
  ): boolean => {
    const politica = perfil.politicas.find(
      p => p.acao === role.acao && p.recurso === role.recurso
    );

    if (politica) {
      if (politica.deny) {
        return false;
      }

      if (
        politica.type === AnyOrOwnEnum.Any &&
        (role.type === AnyOrOwnEnum.Own || role.type === AnyOrOwnEnum.Any)
      ) {
        return true;
      }

      if (
        role.type === AnyOrOwnEnum.Own &&
        politica.type === AnyOrOwnEnum.Own &&
        isSame
      ) {
        return true;
      }
    }

    if (perfil.herda) {
      return this.compare(perfil.herda as PerfilInstance, role, isSame);
    }

    return false;
  };

  public async isValid({
    usuario,
    role,
    empresa,
    isSameUser,
  }: SecurityMatcherOptions) {
    if (usuario.sysAdmin) {
      return true;
    }

    if (empresa) {
      const assoc = usuario.associacoes.find(
        // eslint-disable-next-line no-underscore-dangle
        a => (a.empresa as EmpresaInstance)._id.equals(empresa)
      );

      if (!assoc) {
        return false;
      }

      return this.compare(assoc.perfil as PerfilInstance, role, isSameUser);
    }

    return false;
  }
}
