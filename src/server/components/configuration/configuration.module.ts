import { resolve } from 'path';
import { Module, Global } from '@nestjs/common';

import { ConfigurationService } from './configuration.service';

@Global()
@Module({
  providers: [
    {
      provide: ConfigurationService,
      useValue: new ConfigurationService(resolve(process.env.BASE_DIR as string, `config.${process.env.NODE_ENV}.yml`)),
    },
  ],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
