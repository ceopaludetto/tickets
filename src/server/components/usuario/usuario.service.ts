import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';

import { InjectModel } from '@/server/components/database';
import { Empresa } from '@/server/models/empresa';
import { UsuarioInput, Usuario } from '@/server/models/usuario';

@Injectable()
export class UsuarioService {
  public constructor(@InjectModel(() => Usuario) private readonly usuarioRepository: typeof Usuario) {}

  public async findAll() {
    try {
      return this.usuarioRepository.findAll({ include: [Empresa] });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: string) {
    try {
      return this.usuarioRepository.findByPk(id, { include: [Empresa] });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async createOrUpdate(data: UsuarioInput, id?: string) {
    if (!id) {
      return this.usuarioRepository.create(data, { include: [Empresa] });
    }

    const usuario = await this.usuarioRepository.findByPk(id, { include: [Empresa] });
    if (!usuario) {
      throw new NotFoundException('Falha ao encontrar Usuário');
    }
    return usuario.update(data);
  }

  public async login(email: string, senha: string) {
    try {
      const usuario = await this.usuarioRepository.findOne({ where: { email }, include: [Empresa] });
      if (!usuario) {
        throw new NotFoundException('Falha ao encontrar Usuário');
      }

      if (!(await usuario.comparePassword(senha))) {
        throw new UnauthorizedException('Senha incorreta');
      }

      return usuario;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async delete(id?: string) {
    try {
      const usuario = await this.usuarioRepository.findByPk(id, { include: [Empresa] });
      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado');
      }
      await usuario.destroy();
      return usuario;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
