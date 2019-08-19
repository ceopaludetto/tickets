import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import {
  Empresa,
  EmpresaInput,
  EmpresaInstance,
  AssociacaoEnum,
} from '@/server/models';
import { ID, PayloadType } from '@/server/utils/common.dto';
import { UsuarioService } from '@/server/components/usuario/usuario.service';

@Injectable()
export class EmpresaService {
  private readonly empresaRepository: ModelType<Empresa>;

  private readonly usuarioService: UsuarioService;

  public constructor(
    @InjectModel(Empresa) empresaRepository: ModelType<Empresa>,
    usuarioService: UsuarioService
  ) {
    this.empresaRepository = empresaRepository;
    this.usuarioService = usuarioService;
  }

  public async findAll(skip: number = 0, take: number = 100) {
    try {
      const empresas = await this.empresaRepository
        .find()
        .skip(skip)
        .limit(take)
        .exec();
      return empresas;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: ID) {
    try {
      const empresa = await this.empresaRepository.findById(id);
      if (!empresa) {
        throw new NotFoundException('Empresa não encontrada.');
      }
      return empresa;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async createOrUpdate(data: EmpresaInput, id?: ID) {
    if (!id) {
      try {
        const empresa = await this.empresaRepository.create(data);
        return empresa;
      } catch (err) {
        throw new BadRequestException(err);
      }
    }

    try {
      const empresa = await this.empresaRepository
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
      return empresa;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async postCreation(user: PayloadType, empresa: EmpresaInstance) {
    try {
      const usuario = await this.usuarioService.findOne(user._id);
      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado.');
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
      throw new BadRequestException('Erro ao criar associações');
    }
  }
}
