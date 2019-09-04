import { Module } from '@nestjs/common';

import { ReactController } from './react.controller';
import { ReactService } from './react.service';
import { SchemaModule } from '../schema/schema.module';

@Module({
  imports: [SchemaModule],
  controllers: [ReactController],
  providers: [ReactService],
})
export class ReactModule {}
