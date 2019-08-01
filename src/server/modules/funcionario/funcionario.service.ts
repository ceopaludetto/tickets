import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Funcionario } from './funcionario.entity';
import { InputFuncionario, LoginFuncionario } from './funcionario.dto';

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
    try {
      const funcionarios = await this.funcionarioRepository.find({
        skip,
        take,
        relations: ['Empresa'],
      });
      return funcionarios;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: string) {
    try {
      const funcionario = await this.funcionarioRepository.findOne(id, {
        relations: ['Empresa'],
      });
      return funcionario;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async login({ Email, Password }: LoginFuncionario) {
    try {
      const funcionario = await this.funcionarioRepository.findOne({
        where: { Email },
        relations: ['Empresa'],
      });

      if (!funcionario) {
        throw new NotFoundException('Nenhum funcionário encontrado.');
      }

      if (!(await funcionario.comparePasswords(Password))) {
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
        const assignedData = Object.assign(new Funcionario(), data);
        const funcionario = await this.funcionarioRepository.save(assignedData);
        return funcionario;
      } catch (err) {
        throw new BadRequestException(err);
      }
    }

    try {
      const funcionario = await this.funcionarioRepository.findOne(id);
      if (!funcionario) {
        throw new NotFoundException('Nenhum funcionário encontrado.');
      }
      const res = await this.funcionarioRepository.save(
        Object.assign(funcionario, data)
      );
      return res;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
