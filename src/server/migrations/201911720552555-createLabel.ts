import SequelizeStatic, { QueryInterface } from 'sequelize';

import { LABEL, TICKET, SHORTID } from '@/server/utils/constants';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    await queryInterface.createTable(LABEL, {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: SHORTID,
      },
      descricao: Sequelize.STRING,
      cor: Sequelize.STRING,
      ticketID: {
        type: Sequelize.STRING,
        references: {
          model: TICKET,
          key: 'id',
        },
      },
      dataCriacao: Sequelize.DATE,
      dataAtualizacao: Sequelize.DATE,
      dataExclusao: Sequelize.DATE,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(LABEL);
  },
};
