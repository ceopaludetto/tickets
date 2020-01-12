import SequelizeStatic, { QueryInterface } from 'sequelize';

import { RECURSO } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(RECURSO, {
      ...migrationDefaults(Sequelize),
      nome: Sequelize.STRING,
      descricao: Sequelize.STRING,
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(RECURSO);
  },
};
