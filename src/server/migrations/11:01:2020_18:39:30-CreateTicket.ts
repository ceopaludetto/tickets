import SequelizeStatic, { QueryInterface } from 'sequelize';

import { TICKET, STATUS } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(TICKET, {
      ...migrationDefaults(Sequelize),
      nome: Sequelize.STRING,
      descricao: Sequelize.STRING,
      anexos: Sequelize.ARRAY(Sequelize.STRING),
      statusID: {
        type: Sequelize.STRING,
        references: {
          model: STATUS,
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(TICKET);
  },
};
