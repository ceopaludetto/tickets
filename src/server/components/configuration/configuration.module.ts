import { Module, Global } from '@nestjs/common';
import { resolve } from 'path';

import { ConfigurationService } from './configuration.service';

@Global()
@Module({
  providers: [
    {
      provide: ConfigurationService,
      useValue: new ConfigurationService(
        resolve(process.env.BASE_DIR as string, 'env', `.config.${process.env.NODE_ENV}.yaml`)
      ),
    },
  ],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
