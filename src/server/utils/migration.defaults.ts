import SequelizeStatic from 'sequelize';

import { SHORTID } from '@/server/utils/constants';

export const migrationDefaults = (Sequelize: typeof SequelizeStatic) => ({
  id: {
    primaryKey: true,
    type: Sequelize.STRING,
    defaultValue: SHORTID,
  },
  dataCriacao: Sequelize.DATE,
  dataAtualizacao: Sequelize.DATE,
  dataExclusao: Sequelize.DATE,
});
