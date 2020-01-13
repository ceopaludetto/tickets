import { Injectable, BadRequestException } from '@nestjs/common';

import { InjectModel } from '@/server/components/database';
import { Rotulo } from '@/server/models/rotulo';

@Injectable()
export class RotuloService {
  public constructor(@InjectModel(() => Rotulo) private readonly rotuloRepository: typeof Rotulo) {}

  public async findAll() {
    try {
      return this.rotuloRepository.findAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: string) {
    try {
      return this.rotuloRepository.findByPk(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
