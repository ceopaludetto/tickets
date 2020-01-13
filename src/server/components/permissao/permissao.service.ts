import { Injectable } from '@nestjs/common';

import { InjectModel } from '@/server/components/database';
import { Permissao } from '@/server/models/permissao';

@Injectable()
export class PermissaoService {
  public constructor(@InjectModel(() => Permissao) private readonly permissaoRepository: typeof Permissao) {}

  public async findAll() {
    return this.permissaoRepository.findAll();
  }

  public async findOne(id: string) {
    return this.permissaoRepository.findByPk(id);
  }
}
