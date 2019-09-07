import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { UserInputError } from 'apollo-server-express';

import { Usuario, UsuarioInput, LoginUsuario } from '@/server/models';
import { ID } from '@/server/utils/common.dto';

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
        .populate({
          path: 'associacoes.perfil',
          populate: {
            path: 'herda',
          },
        })
        .populate('associacoes.empresa')
        .exec();
      return usuarios;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: ID) {
    try {
      const usuario = await this.userRepository
        .findById(id)
        .populate({
          path: 'associacoes.perfil',
          populate: {
            path: 'herda',
          },
        })
        .populate('associacoes.empresa')
        .exec();
      return usuario;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async login({ email, senha }: LoginUsuario) {
    const usuario = await this.userRepository
      .findOne({
        email,
      })
      .populate('associacoes.perfil')
      .populate('associacoes.empresa')
      .exec();

    if (!usuario) {
      throw new UserInputError('Nenhum usuário encontrado.', {
        field: 'email',
      });
    }

    if (!(await usuario.comparePasswords(senha))) {
      throw new UserInputError('Senha incorreta', {
        field: 'senha',
      });
    }

    return usuario;
  }

  public async createOrUpdate(data: UsuarioInput, id?: ID) {
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
        .populate({
          path: 'associacoes.perfil',
          populate: {
            path: 'herda',
          },
        })
        .populate('associacoes.empresa')
        .exec();
      return usuario;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
