import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import { Entities } from '@/server/components';
import { SEQUELIZE_PROVIDER } from '@/server/utils/constants';
import { ConfigurationService } from '@/server/components/Configuration';

export const DatabaseProvider: Provider = {
  provide: SEQUELIZE_PROVIDER,
  inject: [ConfigurationService],
  useFactory: async ({ database: { host, dialect, port, user, pass, database, sync } }: ConfigurationService) => {
    const sequelize = new Sequelize({
      logging: false,
      dialect,
      host,
      port,
      database,
      username: user,
      password: pass,
    });
    sequelize.addModels(Entities);

    if (sync) {
      await sequelize.sync();
    }

    return sequelize;
  },
};
