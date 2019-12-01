import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { ApolloError, UserInputError } from 'apollo-server-express';

import { Perfil, PerfilInput } from '@/server/models';
import { ID } from '@/server/utils/common.dto';

@Injectable()
export class SecurityService {
  private readonly perfilRepository: ReturnModelType<typeof Perfil>;

  public constructor(@InjectModel(Perfil) perfilRepo: ReturnModelType<typeof Perfil>) {
    this.perfilRepository = perfilRepo;
  }

  public async findAll(skip = 0, take = 100) {
    try {
      const perfis = await this.perfilRepository
        .find()
        .skip(skip)
        .limit(take)
        .populate('herda')
        .populate('empresa')
        .exec();
      return perfis;
    } catch (err) {
      throw new ApolloError('Erro ao buscar perfis.');
    }
  }

  public async findOne(id: ID) {
    try {
      const perfil = await this.perfilRepository
        .findById(id)
        .populate('herda')
        .populate('empresa')
        .exec();
      if (!perfil) {
        throw new UserInputError('Perfil não encontrado.', {
          field: '_id',
        });
      }

      return perfil;
    } catch (err) {
      throw new ApolloError('Erro ao procurar perfil.');
    }
  }

  public async addOrUpdate(input: PerfilInput, id?: ID) {
    if (!id) {
      try {
        const perfil = await this.perfilRepository.create(input);
        return perfil;
      } catch (err) {
        throw new ApolloError('Falha ao adicionar novo perfil.');
      }
    }

    try {
      const perfil = await this.perfilRepository
        .findByIdAndUpdate(id, input, {
          new: true,
        })
        .populate('herda')
        .populate('empresa')
        .exec();
      return perfil;
    } catch (err) {
      throw new ApolloError('Falha ao atualizar perfil.');
    }
  }
}
