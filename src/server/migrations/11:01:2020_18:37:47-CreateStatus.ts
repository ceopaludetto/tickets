import SequelizeStatic, { QueryInterface } from 'sequelize';

import { STATUS, EMPRESA } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(STATUS, {
      ...migrationDefaults(Sequelize),
      nome: Sequelize.STRING,
      empresaID: {
        type: Sequelize.STRING,
        references: {
          model: EMPRESA,
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(STATUS);
  },
};
