import { Table, Column, ForeignKey } from 'sequelize-typescript';

import { Associacao } from '@/server/models/associacao';
import { Permissao } from '@/server/models/permissao';
import { BaseModel } from '@/server/utils/base.model';
import { ASSOCIACAO_PERMISSAO } from '@/server/utils/constants';

import { AssociacaoPermissaoDTO } from './associacao.permissao.dto';

@Table({ modelName: ASSOCIACAO_PERMISSAO, tableName: ASSOCIACAO_PERMISSAO })
export class AssociacaoPermissao extends BaseModel<AssociacaoPermissao> implements AssociacaoPermissaoDTO {
  @ForeignKey(() => Associacao)
  @Column
  public associacaoID!: string;

  @ForeignKey(() => Permissao)
  @Column
  public permissaoID!: string;
}
