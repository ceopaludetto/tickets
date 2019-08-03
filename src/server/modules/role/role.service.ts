import { Injectable, BadRequestException } from '@nestjs/common';

import { Role } from './role.entity';
import { InjectRepository } from '@/server/modules/database/database.utils';

@Injectable()
export class RoleService {
  private readonly RoleRepository: typeof Role;

  public constructor(@InjectRepository(Role) roleRepository: typeof Role) {
    this.RoleRepository = roleRepository;
  }

  public async findAll() {
    try {
      const roles = await this.RoleRepository.findAll();
      return roles;
    } catch (err) {
      throw new BadRequestException('Falha ao listar roles.', err);
    }
  }

  public async findOne(id: string) {
    try {
      const role = await this.RoleRepository.findByPk(id);
      return role;
    } catch (err) {
      throw new BadRequestException('Falha ao encontrar role.', err);
    }
  }
}
