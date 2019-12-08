import { Injectable, BadRequestException } from '@nestjs/common';

import { InjectModel } from '@/server/components/Database';
import { Ticket } from '@/server/components/Ticket';
import { Label } from './label.entity';

@Injectable()
export class LabelService {
  public constructor(@InjectModel(Label) private readonly labelRepository: typeof Label) {}

  public async findAll() {
    try {
      return this.labelRepository.findAll({ include: [Ticket.scope(undefined)] });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: string) {
    try {
      return this.labelRepository.findByPk(id, { include: [Ticket.scope(undefined)] });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
