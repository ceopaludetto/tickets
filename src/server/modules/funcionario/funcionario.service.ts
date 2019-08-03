import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { Funcionario } from './funcionario.entity';
import { InputFuncionario, LoginFuncionario } from './funcionario.dto';
import { InjectRepository } from '@/server/modules/database/database.utils';

import { Empresa } from '@/server/modules/empresa/empresa.entity';

@Injectable()
export class FuncionarioService {
  private readonly funcionarioRepository: typeof Funcionario;

  public constructor(
    @InjectRepository(Funcionario)
    funcionarioRepository: typeof Funcionario
  ) {
    this.funcionarioRepository = funcionarioRepository;
  }

  public async findAll(skip: number = 0, take: number = 100) {
    try {
      const funcionarios = await this.funcionarioRepository.findAll({
        offset: skip,
        limit: take,
      });
      return funcionarios;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: string) {
    try {
      const funcionario = await this.funcionarioRepository.findByPk(id);
      return funcionario;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async login({ Email, Password }: LoginFuncionario) {
    try {
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
      const funcionario = await this.funcionarioRepository.findByPk(id, {
        include: [{ model: Empresa, as: 'Empresa' }],
      });
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
