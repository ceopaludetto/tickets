import SequelizeStatic, { QueryInterface } from 'sequelize';

import { ASSOCIACAO_PERMISSAO, ASSOCIACAO, PERMISSAO } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(ASSOCIACAO_PERMISSAO, {
      ...migrationDefaults(Sequelize),
      associacaoID: {
        type: Sequelize.STRING,
        references: {
          model: ASSOCIACAO,
          key: 'id',
        },
      },
      permissaoID: {
        type: Sequelize.STRING,
        references: {
          model: PERMISSAO,
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(ASSOCIACAO_PERMISSAO);
  },
};
