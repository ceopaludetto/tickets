import SequelizeStatic, { QueryInterface } from 'sequelize';

import { PERFIL, EMPRESA, SHORTID } from '@/server/utils/constants';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    await queryInterface.createTable(PERFIL, {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: SHORTID,
      },
      nome: Sequelize.STRING,
      descricao: Sequelize.STRING,
      herdaID: {
        type: Sequelize.STRING,
        references: {
          model: PERFIL,
          key: 'id',
        },
      },
      empresaID: {
        type: Sequelize.STRING,
        references: {
          model: EMPRESA,
          key: 'id',
        },
      },
      dataCriacao: Sequelize.DATE,
      dataAtualizacao: Sequelize.DATE,
      dataExclusao: Sequelize.DATE,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(PERFIL);
  },
};
