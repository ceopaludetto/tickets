import SequelizeStatic, { QueryInterface } from 'sequelize';

import { LABEL, TICKET } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    await queryInterface.createTable(LABEL, {
      ...migrationDefaults(Sequelize),
      descricao: Sequelize.STRING,
      cor: Sequelize.STRING,
      ticketID: {
        type: Sequelize.STRING,
        references: {
          model: TICKET,
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(LABEL);
  },
};
