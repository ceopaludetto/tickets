import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { Funcionario } from './funcionario.entity';
import { InputFuncionario, LoginFuncionario } from './funcionario.dto';

@Injectable()
export class FuncionarioService {
  private readonly funcionarioRepository: ModelType<Funcionario>;

  public constructor(
    @InjectModel(Funcionario)
    funcionarioRepository: ModelType<Funcionario>
  ) {
    this.funcionarioRepository = funcionarioRepository;
  }

  public async findAll(skip: number = 0, take: number = 100) {
    try {
      const funcionarios = await this.funcionarioRepository
        .find()
        .skip(skip)
        .limit(take)
        .populate('empresa')
        .exec();
      return funcionarios;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: string) {
    try {
      const funcionario = await this.funcionarioRepository
        .findById(id)
        .populate('empresa')
        .exec();
      return funcionario;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async login({ email, senha }: LoginFuncionario) {
    try {
      const funcionario = await this.funcionarioRepository.findOne({
        email,
      });

      if (!funcionario) {
        throw new NotFoundException('Nenhum funcionário encontrado.');
      }

      if (!(await funcionario.comparePasswords(senha))) {
        throw new UnauthorizedException('Senha incorreta');
      }

      return funcionario;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async createOrUpdate(data: InputFuncionario, id?: string) {
    if (!id) {
      try {
        const funcionario = await this.funcionarioRepository.create(data);
        return funcionario;
      } catch (err) {
        throw new BadRequestException(err);
      }
    }

    try {
      const funcionario = await this.funcionarioRepository
        .findById(id)
        .populate('empresa')
        .exec();
      if (!funcionario) {
        throw new NotFoundException('Nenhum funcionário encontrado.');
      }
      const res = await funcionario.update(data);
      return res;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
