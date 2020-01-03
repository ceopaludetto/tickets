import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@/server/components/database';
import { Empresa, EmpresaInput } from '@/server/models/empresa';

@Injectable()
export class EmpresaService {
  public constructor(@InjectModel(() => Empresa) private readonly empresaRepository: typeof Empresa) {}

  public async findAll() {
    try {
      return this.empresaRepository.findAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: string) {
    try {
      return this.empresaRepository.findByPk(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async createOrUpdate(data: EmpresaInput, id?: string) {
    try {
      if (!id) {
        return this.empresaRepository.create(data);
      }

      const empresa = await this.empresaRepository.findByPk(id);
      if (!empresa) {
        throw new NotFoundException('Falha ao encontrar empresa');
      }

      return empresa.update(data);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async delete(id: string) {
    try {
      const empresa = await this.empresaRepository.findByPk(id);
      if (!empresa) {
        throw new NotFoundException('Falha ao encontrar empresa');
      }
      await empresa.destroy();
      return empresa;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
