import SequelizeStatic, { QueryInterface } from 'sequelize';

import { TICKET } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    await queryInterface.createTable(TICKET, {
      ...migrationDefaults(Sequelize),
      nome: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      descricao: Sequelize.STRING,
      dataNascimento: Sequelize.DATE,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(TICKET);
  },
};
