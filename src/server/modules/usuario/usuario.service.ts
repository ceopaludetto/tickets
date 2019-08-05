import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { Usuario } from './usuario.entity';
import { InputUsuario, LoginUsuario } from './usuario.dto';

@Injectable()
export class UsuarioService {
  private readonly userRepository: ModelType<Usuario>;

  public constructor(
    @InjectModel(Usuario)
    userRepository: ModelType<Usuario>
  ) {
    this.userRepository = userRepository;
  }

  public async findAll(skip: number = 0, take: number = 100) {
    try {
      const usuarios = await this.userRepository
        .find()
        .skip(skip)
        .limit(take)
        .populate('empresa')
        .exec();
      return usuarios;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: string) {
    try {
      const usuario = await this.userRepository
        .findById(id)
        .populate('empresa')
        .exec();
      return usuario;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async login({ email, senha }: LoginUsuario) {
    try {
      const usuario = await this.userRepository.findOne({
        email,
      });

      if (!usuario) {
        throw new NotFoundException('Nenhum funcionário encontrado.');
      }

      if (!(await usuario.comparePasswords(senha))) {
        throw new UnauthorizedException('Senha incorreta');
      }

      return usuario;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async createOrUpdate(data: InputUsuario, id?: string) {
    if (!id) {
      try {
        const usuario = await this.userRepository.create(data);
        return usuario;
      } catch (err) {
        throw new BadRequestException(err);
      }
    }

    try {
      const usuario = await this.userRepository
        .findByIdAndUpdate(id, data, { new: true })
        .populate('empresa')
        .exec();
      return usuario;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
