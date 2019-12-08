import SequelizeStatic, { QueryInterface } from 'sequelize';

import { EMPRESA, SHORTID } from '@/server/utils/constants';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    await queryInterface.createTable(EMPRESA, {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: SHORTID,
      },
      razaoSocial: Sequelize.STRING,
      cnpj: Sequelize.STRING,
      cep: Sequelize.STRING,
      telefone: Sequelize.STRING,
      dataCriacao: Sequelize.DATE,
      dataAtualizacao: Sequelize.DATE,
      dataExclusao: Sequelize.DATE,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(EMPRESA);
  },
};
