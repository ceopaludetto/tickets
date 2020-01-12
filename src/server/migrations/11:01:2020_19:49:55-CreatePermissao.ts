import SequelizeStatic, { QueryInterface } from 'sequelize';

import { PERMISSAO, EMPRESA } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(PERMISSAO, {
      ...migrationDefaults(Sequelize),
      permissaoID: {
        type: Sequelize.STRING,
        references: {
          model: PERMISSAO,
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
      nome: Sequelize.STRING,
      descricao: Sequelize.STRING,
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(PERMISSAO);
  },
};
