import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { Role } from './role.entity';

@Injectable()
export class RoleService {
  private readonly RoleRepository: ModelType<Role>;

  public constructor(@InjectModel(Role) roleRepository: ModelType<Role>) {
    this.RoleRepository = roleRepository;
  }

  public async findAll() {
    try {
      const roles = await this.RoleRepository.find().exec();
      return roles;
    } catch (err) {
      throw new BadRequestException('Falha ao listar roles.', err);
    }
  }

  public async findOne(id: string) {
    try {
      const role = await this.RoleRepository.findById(id).exec();
      return role;
    } catch (err) {
      throw new BadRequestException('Falha ao encontrar role.', err);
    }
  }
}
