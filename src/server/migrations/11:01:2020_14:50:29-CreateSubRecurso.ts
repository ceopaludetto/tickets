import SequelizeStatic, { QueryInterface } from 'sequelize';

import { SUB_RECURSO, RECURSO } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(SUB_RECURSO, {
      ...migrationDefaults(Sequelize),
      recursoID: {
        type: Sequelize.STRING,
        references: {
          model: RECURSO,
          key: 'id',
        },
      },
      nome: Sequelize.STRING,
      descricao: Sequelize.STRING,
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(SUB_RECURSO);
  },
};
