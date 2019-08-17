import { resolve } from 'path';
import { Module, Global } from '@nestjs/common';

import { ConfigurationService } from './configuration.service';

@Global()
@Module({
  providers: [
    {
      provide: ConfigurationService,
      useValue: new ConfigurationService(
        resolve(`.env.${process.env.NODE_ENV}`)
      ),
    },
  ],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
