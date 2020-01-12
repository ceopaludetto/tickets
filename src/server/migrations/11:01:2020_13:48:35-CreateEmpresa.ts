import SequelizeStatic, { QueryInterface } from 'sequelize';

import { EMPRESA } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(EMPRESA, {
      ...migrationDefaults(Sequelize),
      CNPJ: {
        type: Sequelize.STRING,
        unique: true,
      },
      razaoSocial: Sequelize.STRING,
      nomeFantasia: Sequelize.STRING,
      nomeCompleto: Sequelize.STRING,
      telefone: Sequelize.STRING,
      site: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: Sequelize.STRING,
      CEP: Sequelize.STRING,
      endereco: Sequelize.STRING,
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(EMPRESA);
  },
};
