import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';

import { InjectModel } from '@/server/components/Database';
import { CreateOrUpdateUsuarioDto } from './usuario.dto';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  public constructor(@InjectModel(Usuario) private readonly usuarioRepository: typeof Usuario) {}

  public async findAll() {
    try {
      return await this.usuarioRepository.findAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async findOne(id: string) {
    try {
      return await this.usuarioRepository.findByPk(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async createOrUpdate(data: CreateOrUpdateUsuarioDto, id?: string) {
    try {
      if (!id) {
        return await this.usuarioRepository.create(data);
      }

      const usuario = await this.usuarioRepository.findByPk(id);
      if (!usuario) {
        throw new NotFoundException('Falha ao encontrar Usuário');
      }
      return await usuario.update(data);
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
