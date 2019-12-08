import SequelizeStatic, { QueryInterface } from 'sequelize';

import { TICKET, SHORTID } from '@/server/utils/constants';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    await queryInterface.createTable(TICKET, {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: SHORTID,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      descricao: Sequelize.STRING,
      dataNascimento: Sequelize.DATE,
      dataCriacao: Sequelize.DATE,
      dataAtualizacao: Sequelize.DATE,
      dataExclusao: Sequelize.DATE,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(TICKET);
  },
};
