import SequelizeStatic, { QueryInterface } from 'sequelize';

import { USUARIO, SHORTID } from '@/server/utils/constants';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    await queryInterface.createTable(USUARIO, {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: SHORTID,
      },
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
      dataNascimento: Sequelize.DATE,
      dataCriacao: Sequelize.DATE,
      dataAtualizacao: Sequelize.DATE,
      dataExclusao: Sequelize.DATE,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(USUARIO);
  },
};
