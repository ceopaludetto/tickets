import {
  SecurityMatcherOptions,
  Role,
  EmpresaInstance,
  PerfilInstance,
} from './security.dto';

export class SecurityMatcher {
  private compare = (perfil: PerfilInstance, role: Role): boolean => {
    const politica = perfil.politicas.find(
      p => p.acao === role.acao && p.recurso === role.recurso
    );

    if (politica) {
      return true;
    }

    if (perfil.herda) {
      return this.compare(perfil.herda as PerfilInstance, role);
    }

    return false;
  };

  // private findEmpresa = ({}: SecurityMatcherOptions) => {

  // }

  public async isValid({ usuario, role, empresa }: SecurityMatcherOptions) {
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

      return this.compare(assoc.perfil as PerfilInstance, role);
    }

    return false;
  }
}
