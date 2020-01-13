import SequelizeStatic, { QueryInterface } from 'sequelize';

import { USUARIO } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(USUARIO, {
      ...migrationDefaults(Sequelize),
      nome: Sequelize.STRING,
      sobrenome: Sequelize.STRING,
      dataNascimento: Sequelize.DATE,
      senha: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      sysAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      telefone: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(USUARIO, {});
  },
};
