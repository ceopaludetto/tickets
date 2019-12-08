import { Controller, Get, Param } from '@nestjs/common';

import { LabelService } from './label.service';
import { FindOneParam } from '@/server/utils/common.dto';

@Controller('label')
export class LabelController {
  public constructor(private readonly labelService: LabelService) {}

  @Get('/')
  public async findAllLabels() {
    return this.labelService.findAll();
  }

  @Get('/:id')
  public async findOneLabel(@Param() { id }: FindOneParam) {
    return this.labelService.findOne(id);
  }
}
