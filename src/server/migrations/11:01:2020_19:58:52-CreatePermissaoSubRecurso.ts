import SequelizeStatic, { QueryInterface } from 'sequelize';

import { TipoEnum } from '@/server/models/permissaoSubRecurso';
import { PERMISSAO_SUB_RECURSO, SUB_RECURSO, PERMISSAO } from '@/server/utils/constants';
import { migrationDefaults } from '@/server/utils/migration.defaults';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(PERMISSAO_SUB_RECURSO, {
      ...migrationDefaults(Sequelize),
      subRecursoID: {
        type: Sequelize.STRING,
        references: {
          model: SUB_RECURSO,
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
      tipo: Sequelize.ARRAY(Sequelize.ENUM(TipoEnum.READ, TipoEnum.WRITE, TipoEnum.UPDATE, TipoEnum.DELETE)),
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(PERMISSAO_SUB_RECURSO);
  },
};
