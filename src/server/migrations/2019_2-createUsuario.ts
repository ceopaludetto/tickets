import SequelizeStatic, { QueryInterface } from 'sequelize';

import { USUARIO } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    await queryInterface.createTable(USUARIO, {
      ...migrationDefaults(Sequelize),
      nome: Sequelize.STRING,
      sobrenome: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      senha: Sequelize.STRING,
      telefone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sysAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      dataNascimento: Sequelize.DATE,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(USUARIO);
  },
};
