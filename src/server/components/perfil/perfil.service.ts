import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

import { InjectModel, InjectSequelize, Sequelize } from '@/server/components/database';
import { Empresa } from '@/server/models/empresa';
import { Perfil, PerfilInput } from '@/server/models/perfil';
import { Politica } from '@/server/models/politica';

@Injectable()
export class PerfilService {
  public constructor(
    @InjectModel(() => Perfil) private readonly perfilRepository: typeof Perfil,
    @InjectModel(() => Politica) private readonly politicaRepository: typeof Politica,
    @InjectSequelize() private readonly sequelize: Sequelize
  ) {}

  public async findAll() {
    try {
      return this.perfilRepository.findAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: string) {
    try {
      return this.perfilRepository.findByPk(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async createOrUpdate({ politica, ...rest }: PerfilInput, id?: string) {
    try {
      if (!id) {
        return this.sequelize.transaction(async t => {
          const perfil = await this.perfilRepository.create(rest);
          if (politica && politica.length) {
            await Promise.all(
              politica.map(async p => this.politicaRepository.create({ ...p, perfilID: perfil.id }, { transaction: t }))
            );
          }
          return perfil.reload({ transaction: t, include: [Politica, Empresa] });
        });
      }

      return this.sequelize.transaction(async t => {
        const perfil = await this.perfilRepository.findByPk(id, { transaction: t });
        if (!perfil) {
          throw new NotFoundException('Falha ao encontrar perfil');
        }

        if (politica && politica.length) {
          await this.politicaRepository.destroy({ where: { perfilID: perfil.id }, transaction: t });
          const politicas = await Promise.all(
            politica.map(async p => this.politicaRepository.create({ ...p, perfilID: perfil.id }, { transaction: t }))
          );
          perfil.politica = politicas;
        }
        const updated = await perfil.update(rest, { transaction: t });
        return updated.reload({ transaction: t, include: [Politica, Empresa] });
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async delete(id: string) {
    try {
      const perfil = await this.perfilRepository.findByPk(id);
      if (!perfil) {
        throw new NotFoundException('Falha ao encontrar perfil');
      }
      await perfil.destroy();
      return perfil;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
