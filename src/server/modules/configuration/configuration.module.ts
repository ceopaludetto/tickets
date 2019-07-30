import { Module } from '@nestjs/common';

import { ConfigurationService } from './configuration.service';

@Module({
  providers: [
    {
      provide: ConfigurationService,
      useValue: new ConfigurationService(`./.env.${process.env.NODE_ENV}`),
    },
  ],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
