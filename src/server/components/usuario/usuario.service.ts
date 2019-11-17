import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserInputError, ApolloError } from 'apollo-server-express';

import { Usuario, UsuarioInput, LoginUsuario } from '@/server/models';
import { ID, ModelFields } from '@/server/utils/common.dto';

@Injectable()
export class UsuarioService {
  private readonly userRepository: ReturnModelType<typeof Usuario>;

  public constructor(
    @InjectModel(Usuario)
    userRepository: ReturnModelType<typeof Usuario>
  ) {
    this.userRepository = userRepository;
  }

  public async findAll(skip = 0, take = 100) {
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
      throw new ApolloError(err);
    }
  }

  public async findOne(field: ModelFields<Usuario>) {
    try {
      const usuario = await this.userRepository
        .findOne(field)
        .populate({
          path: 'associacoes.perfil',
          populate: {
            path: 'herda',
          },
        })
        .populate('associacoes.empresa')
        .exec();

      if (!usuario) {
        throw new UserInputError('Usuário não encontrado', {
          field: Object.keys(field),
        });
      }

      return usuario;
    } catch (err) {
      throw new ApolloError(err);
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
        throw new ApolloError(err);
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
      throw new ApolloError(err);
    }
  }
}
