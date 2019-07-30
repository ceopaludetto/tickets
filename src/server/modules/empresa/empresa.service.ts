import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Empresa } from './empresa.entity';
import { InputEmpresaInsertOrUpdate } from './empresa.dto';

@Injectable()
export class EmpresaService {
  private readonly empresaRepository: Repository<Empresa>;

  public constructor(
    @InjectRepository(Empresa) empresaRepository: Repository<Empresa>
  ) {
    this.empresaRepository = empresaRepository;
  }

  public async findAll(skip: number = 0, take: number = 100) {
    const empresas = await this.empresaRepository.find({ skip, take });
    if (!empresas) {
      throw new BadRequestException('Erro ao retornar empresas.');
    }
    if (!empresas.length) {
      throw new NotFoundException('Nenhuma empresa encontrada.');
    }
    return empresas;
  }

  public async findOne(id: string) {
    const empresa = await this.empresaRepository.findOne(id);
    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada.');
    }
    return empresa;
  }

  public async createOrUpdate(data: InputEmpresaInsertOrUpdate, id?: string) {
    if (!id) {
      try {
        const empresa = await this.empresaRepository.save(data);
        return empresa;
      } catch (err) {
        throw new BadRequestException(err);
      }
    }

    try {
      const empresa = await this.empresaRepository.findOne(id);
      if (!empresa) {
        throw new NotFoundException('Nenhuma empresa encontrada.');
      }
      const res = await this.empresaRepository.save({ ...empresa, ...data });
      return res;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
