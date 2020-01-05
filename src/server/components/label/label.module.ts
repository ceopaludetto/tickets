import { Module } from '@nestjs/common';

import { LabelController } from './label.controller';
import { LabelService } from './label.service';
import { DatabaseModule } from '@/server/components/database';
import { Label } from '@/server/models/label';

@Module({
  imports: [DatabaseModule.forFeature([() => Label])],
  controllers: [LabelController],
  providers: [LabelService],
  exports: [LabelService],
})
export class LabelModule {}
