import SequelizeStatic, { QueryInterface } from 'sequelize';

import { ROTULO_TICKET, TICKET, ROTULO } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(ROTULO_TICKET, {
      ...migrationDefaults(Sequelize),
      ticketID: {
        type: Sequelize.STRING,
        references: {
          model: TICKET,
          key: 'id',
        },
      },
      rotuloID: {
        type: Sequelize.STRING,
        references: {
          model: ROTULO,
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(ROTULO_TICKET);
  },
};
