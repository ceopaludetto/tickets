import SequelizeStatic, { QueryInterface } from 'sequelize';

import { ROTULO, EMPRESA } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(ROTULO, {
      ...migrationDefaults(Sequelize),
      empresaID: {
        type: Sequelize.STRING,
        references: {
          model: EMPRESA,
          key: 'id',
        },
      },
      descricao: Sequelize.STRING,
      cor: Sequelize.STRING,
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(ROTULO);
  },
};
