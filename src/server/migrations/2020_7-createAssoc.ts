import SequelizeStatic, { QueryInterface } from 'sequelize';

import { ASSOCIACAO, EMPRESA, USUARIO, PERFIL } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    await queryInterface.createTable(ASSOCIACAO, {
      ...migrationDefaults(Sequelize),
      empresaID: {
        type: Sequelize.STRING,
        references: {
          model: EMPRESA,
          key: 'id',
        },
      },
      usuarioID: {
        type: Sequelize.STRING,
        references: {
          model: USUARIO,
          key: 'id',
        },
      },
      perfilID: {
        type: Sequelize.STRING,
        references: {
          model: PERFIL,
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(ASSOCIACAO);
  },
};
