import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { Empresa } from './empresa.entity';
import { InputEmpresa } from './empresa.dto';

@Injectable()
export class EmpresaService {
  private readonly empresaRepository: ModelType<Empresa>;

  public constructor(
    @InjectModel(Empresa) empresaRepository: ModelType<Empresa>
  ) {
    this.empresaRepository = empresaRepository;
  }

  public async findAll(skip: number = 0, take: number = 100) {
    try {
      const empresas = await this.empresaRepository
        .find()
        .skip(skip)
        .limit(take)
        .exec();
      return empresas;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: string) {
    try {
      const empresa = await this.empresaRepository.findById(id);
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
        return empresa;
      } catch (err) {
        throw new BadRequestException(err);
      }
    }

    try {
      const empresa = await this.empresaRepository
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
      return empresa;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
