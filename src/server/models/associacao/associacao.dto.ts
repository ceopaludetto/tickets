import { EmpresaDTO } from '@/server/models/empresa';
import { PerfilDTO } from '@/server/models/perfil';
import { UsuarioDTO } from '@/server/models/usuario';
import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface AssociacaoDTO extends BaseEntityDTO {
  empresaID: string;
  usuarioID: string;
  perfilID: string;
  empresa: EmpresaDTO;
  usuario: UsuarioDTO;
  perfil: PerfilDTO;
}

export interface AssociacaoInputDTO {
  empresaID?: string;
  usuarioID?: string;
  perfilID?: string;
}
