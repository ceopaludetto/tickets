import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';

import { InjectModel } from '@/server/components/database';
import { UsuarioInput } from './usuario.dto';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  public constructor(@InjectModel(() => Usuario) private readonly usuarioRepository: typeof Usuario) {}

  public async findAll() {
    try {
      return this.usuarioRepository.findAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: string) {
    try {
      return this.usuarioRepository.findByPk(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async createOrUpdate(data: UsuarioInput, id?: string) {
    try {
      if (!id) {
        return this.usuarioRepository.create(data);
      }

      const usuario = await this.usuarioRepository.findByPk(id);
      if (!usuario) {
        throw new NotFoundException('Falha ao encontrar Usuário');
      }
      return usuario.update(data);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async login(email: string, senha: string) {
    try {
      const usuario = await this.usuarioRepository.findOne({ where: { email } });
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
      const usuario = await this.usuarioRepository.findByPk(id);
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
