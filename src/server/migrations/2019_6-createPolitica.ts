import SequelizeStatic, { QueryInterface } from 'sequelize';

import { EnumNivelAcesso, EnumTipoAcesso } from '@/server/models/politica';
import { POLITICA, SHORTID, PERFIL } from '@/server/utils/constants';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    await queryInterface.createTable(POLITICA, {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: SHORTID,
      },
      descricao: Sequelize.STRING,
      tipo: {
        type: Sequelize.ENUM(EnumTipoAcesso.Qualquer, EnumTipoAcesso.Proprio),
        defaultValue: EnumTipoAcesso.Qualquer,
      },
      nivel: {
        type: Sequelize.ENUM(EnumNivelAcesso.Ler, EnumNivelAcesso.Escrever, EnumNivelAcesso.Excluir),
        defaultValue: EnumNivelAcesso.Ler,
      },
      negacao: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      perfilID: {
        type: Sequelize.STRING,
        references: {
          model: PERFIL,
          key: 'id',
        },
      },
      dataCriacao: Sequelize.DATE,
      dataAtualizacao: Sequelize.DATE,
      dataExclusao: Sequelize.DATE,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(POLITICA);
  },
};
