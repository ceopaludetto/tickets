import SequelizeStatic, { QueryInterface } from 'sequelize';

import { EMPRESA } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    await queryInterface.createTable(EMPRESA, {
      ...migrationDefaults(Sequelize),
      razaoSocial: Sequelize.STRING,
      cnpj: Sequelize.STRING,
      cep: Sequelize.STRING,
      telefone: Sequelize.STRING,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(EMPRESA);
  },
};
