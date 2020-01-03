import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import { ConfigurationService } from '@/server/components/configuration';
import { Entities } from '@/server/models';
import { SEQUELIZE_PROVIDER } from '@/server/utils/constants';

export const DatabaseProvider: Provider = {
  provide: SEQUELIZE_PROVIDER,
  inject: [ConfigurationService],
  useFactory: async ({ database: { host, username, password, database, port, synchronize } }: ConfigurationService) => {
    const sequelize = new Sequelize({
      dialect: 'postgres',
      host,
      username,
      database,
      password,
      port,
      logging: false,
    });

    sequelize.addModels(Entities);

    if (synchronize) {
      await sequelize.sync();
    }

    return sequelize;
  },
};
