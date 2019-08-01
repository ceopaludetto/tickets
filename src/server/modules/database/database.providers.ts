import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import { ConfigurationService } from '@/server/modules/configuration/configuration.service';
import { ROOT_PROVIDER } from '@/server/utils/constants';

export interface ModelInjection {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any;
}

export function generateRootProviders(models: string[]) {
  const RootProvider: Provider = {
    provide: ROOT_PROVIDER,
    inject: [ConfigurationService],
    useFactory: async (configService: ConfigurationService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.HOST,
        port: configService.PORT,
        username: configService.USERNAME,
        password: configService.PASSWORD,
        database: configService.DATABASE,
        logging: false,
      });

      sequelize.addModels(models);
      await sequelize.sync();
      return sequelize;
    },
  };
  return RootProvider;
}

export function generateFeatureProviders(models: ModelInjection[]) {
  const FeatureProvider: Provider[] = [];

  models.forEach(m => {
    FeatureProvider.push({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      provide: m.name,
      useValue: m.model,
    });
  });

  return FeatureProvider;
}
