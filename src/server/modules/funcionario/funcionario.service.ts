import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Funcionario } from './funcionario.entity';
import {
  InputFuncionarioInsertOrUpdate,
  LoginFuncionario,
} from './funcionario.dto';

@Injectable()
export class FuncionarioService {
  private readonly funcionarioRepository: Repository<Funcionario>;

  public constructor(
    @InjectRepository(Funcionario)
    funcionarioRepository: Repository<Funcionario>
  ) {
    this.funcionarioRepository = funcionarioRepository;
  }

  public async findAll(skip: number = 0, take: number = 100) {
    const funcionarios = await this.funcionarioRepository.find({ skip, take });
    return funcionarios;
  }

  public async findOne(id: string) {
    const funcionario = await this.funcionarioRepository.findOne(id);
    return funcionario;
  }

  public async login({ Email, Password }: LoginFuncionario) {
    const funcionario = await this.funcionarioRepository.findOne({
      where: { Email },
    });
    if (!funcionario) {
      throw new NotFoundException('Nenhum funcionário encontrado.');
    }

    if (!(await funcionario.comparePasswords(Password))) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return funcionario;
  }

  public async createOrUpdate(
    data: InputFuncionarioInsertOrUpdate,
    id?: string
  ) {
    if (!id) {
      try {
        const funcionario = Object.assign(new Funcionario(), data);
        const empresa = await this.funcionarioRepository.save(funcionario);
        return empresa;
      } catch (err) {
        throw new BadRequestException(err);
      }
    }

    try {
      const funcionario = await this.funcionarioRepository.findOne(id);
      if (!funcionario) {
        throw new NotFoundException('Nenhum funcionário encontrado.');
      }
      const res = await this.funcionarioRepository.save({
        ...funcionario,
        ...data,
      });
      return res;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
