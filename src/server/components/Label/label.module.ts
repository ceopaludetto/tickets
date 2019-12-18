import { Module } from '@nestjs/common';

import { Label } from './label.entity';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';
import { DatabaseModule } from '@/server/components/database';

@Module({
  imports: [DatabaseModule.forFeature([() => Label])],
  controllers: [LabelController],
  providers: [LabelService],
  exports: [LabelService],
})
export class LabelModule {}
