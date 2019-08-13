import { Injectable } from '@nestjs/common';
import { ModelType } from 'typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { Perfil, PerfilInput } from '@/server/models';
import { ID } from '@/server/utils/common.dto';

@Injectable()
export class SecurityService {
  private readonly perfilRepository: ModelType<Perfil>;

  public constructor(@InjectModel(Perfil) perfilRepo: ModelType<Perfil>) {
    this.perfilRepository = perfilRepo;
  }

  public async findAll(skip = 0, take = 100) {
    const perfis = await this.perfilRepository
      .find()
      .skip(skip)
      .limit(take)
      .populate('herda')
      .populate('empresa')
      .exec();
    return perfis;
  }

  public async findOne(id: ID) {
    const perfil = await this.perfilRepository
      .findById(id)
      .populate('herda')
      .populate('empresa')
      .exec();
    return perfil;
  }

  public async addOrUpdate(input: PerfilInput, id?: ID) {
    if (!id) {
      const perfil = await this.perfilRepository.create(input);
      return perfil;
    }

    const perfil = await this.perfilRepository
      .findByIdAndUpdate(id, input, {
        new: true,
      })
      .populate('herda')
      .populate('empresa')
      .exec();
    return perfil;
  }
}
