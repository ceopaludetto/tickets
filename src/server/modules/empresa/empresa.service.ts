import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Empresa } from './empresa.entity';
import { InputEmpresa } from './empresa.dto';

@Injectable()
export class EmpresaService {
  private readonly empresaRepository: Repository<Empresa>;

  public constructor(
    @InjectRepository(Empresa) empresaRepository: Repository<Empresa>
  ) {
    this.empresaRepository = empresaRepository;
  }

  public async findAll(skip: number = 0, take: number = 100) {
    try {
      const empresas = await this.empresaRepository.find({ skip, take });
      return empresas;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: string) {
    try {
      const empresa = await this.empresaRepository.findOne(id);
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
        const empresa = this.empresaRepository.create(data);
        const res = await this.empresaRepository.save(empresa);
        return res;
      } catch (err) {
        throw new BadRequestException(err);
      }
    }

    try {
      const empresa = await this.empresaRepository.findOne(id);
      if (!empresa) {
        throw new NotFoundException('Empresa não encontrada');
      }
      const res = await this.empresaRepository.save(
        Object.assign(empresa, data)
      );
      return res;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
