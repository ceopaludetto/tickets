import { Table, Column, ForeignKey } from 'sequelize-typescript';

import { Empresa } from '@/server/models/empresa';
import { Usuario } from '@/server/models/usuario';
import { BaseModel } from '@/server/utils/base.model';
import { ASSOCIACAO } from '@/server/utils/constants';

import { AssociacaoDTO } from './associacao.dto';

@Table({ modelName: ASSOCIACAO, tableName: ASSOCIACAO })
export class Associacao extends BaseModel<Associacao> implements AssociacaoDTO {
  @ForeignKey(() => Empresa)
  @Column
  public empresaID!: string;

  @ForeignKey(() => Usuario)
  @Column
  public usuarioID!: string;
}
