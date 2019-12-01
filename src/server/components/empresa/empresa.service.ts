import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApolloError, UserInputError } from 'apollo-server-express';

import { Empresa, EmpresaInput, EmpresaDoc, AssociacaoEnum } from '@/server/models';
import { ID, PayloadType } from '@/server/utils/common.dto';
import { UsuarioService } from '@/server/components/usuario/usuario.service';

@Injectable()
export class EmpresaService {
  private readonly empresaRepository: ReturnModelType<typeof Empresa>;

  private readonly usuarioService: UsuarioService;

  public constructor(
    @InjectModel(Empresa) empresaRepository: ReturnModelType<typeof Empresa>,
    usuarioService: UsuarioService
  ) {
    this.empresaRepository = empresaRepository;
    this.usuarioService = usuarioService;
  }

  public async findAll(skip = 0, take = 100) {
    try {
      const empresas = await this.empresaRepository
        .find()
        .skip(skip)
        .limit(take)
        .exec();
      return empresas;
    } catch (err) {
      throw new ApolloError(err);
    }
  }

  public async findOne(id: ID) {
    try {
      const empresa = await this.empresaRepository.findById(id);
      if (!empresa) {
        throw new UserInputError('Empresa não encontrada.', {
          field: '_id',
        });
      }
      return empresa;
    } catch (err) {
      throw new ApolloError(err);
    }
  }

  public async createOrUpdate(data: EmpresaInput, id?: ID) {
    if (!id) {
      try {
        const empresa = await this.empresaRepository.create(data);
        return empresa;
      } catch (err) {
        throw new ApolloError(err);
      }
    }

    try {
      const empresa = await this.empresaRepository.findByIdAndUpdate(id, data, { new: true }).exec();
      return empresa;
    } catch (err) {
      throw new ApolloError(err);
    }
  }

  public async postCreation(user: PayloadType, empresa: EmpresaDoc) {
    try {
      const usuario = await this.usuarioService.findOne(user._id);
      if (!usuario) {
        throw new ApolloError('Usuário não encontrado.');
      }

      const updated = await this.usuarioService.createOrUpdate(
        {
          associacoes: [
            ...usuario.associacoes,
            {
              empresa: empresa._id,
              tipo: AssociacaoEnum.Dono,
            },
          ],
        },
        user._id
      );
      return updated;
    } catch (err) {
      throw new ApolloError('Erro ao criar associações');
    }
  }
}
