import SequelizeStatic, { QueryInterface } from 'sequelize';

import { EnumNivelAcesso, EnumTipoAcesso } from '@/server/models/politica';
import { POLITICA, PERFIL } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    await queryInterface.createTable(POLITICA, {
      ...migrationDefaults(Sequelize),
      descricao: Sequelize.STRING,
      tipo: {
        type: Sequelize.ENUM(EnumTipoAcesso.Qualquer, EnumTipoAcesso.Proprio),
        defaultValue: EnumTipoAcesso.Qualquer,
      },
      nivel: {
        type: Sequelize.ARRAY(Sequelize.ENUM(EnumNivelAcesso.Ler, EnumNivelAcesso.Escrever, EnumNivelAcesso.Excluir)),
      },
      negacao: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable(POLITICA);
  },
};
