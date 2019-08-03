import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@/server/modules/database/database.utils';
import { Empresa } from './empresa.entity';
import { InputEmpresa } from './empresa.dto';

@Injectable()
export class EmpresaService {
  private readonly empresaRepository: typeof Empresa;

  public constructor(
    @InjectRepository(Empresa) empresaRepository: typeof Empresa
  ) {
    this.empresaRepository = empresaRepository;
  }

  public async findAll(skip: number = 0, take: number = 100) {
    try {
      const empresas = await this.empresaRepository.findAll({
        limit: take,
        offset: skip,
      });
      return empresas;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: string) {
    try {
      const empresa = await this.empresaRepository.findByPk(id);
      if (!empresa) {
        throw new NotFoundException('Empresa não encontrada.');
      }
      return empresa;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async createOrUpdate(data: InputEmpresa, id?: string) {
    if (!id) {
      try {
        const empresa = await this.empresaRepository.create(data);
        // const res = await this.empresaRepository.save(empresa);
        return empresa;
      } catch (err) {
        throw new BadRequestException(err);
      }
    }

    try {
      const empresa = await this.empresaRepository.findByPk(id);
      if (!empresa) {
        throw new NotFoundException('Empresa não encontrada');
      }
      const res = await empresa.update(data);
      return res;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
