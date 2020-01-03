import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/server/components/database';
import { Label } from '@/server/models/label';

import { LabelController } from './label.controller';
import { LabelService } from './label.service';

@Module({
  imports: [DatabaseModule.forFeature([() => Label])],
  controllers: [LabelController],
  providers: [LabelService],
  exports: [LabelService],
})
export class LabelModule {}
