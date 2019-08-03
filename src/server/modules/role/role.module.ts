import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { Role } from './role.entity';

@Module({
  imports: [TypegooseModule.forFeature([Role])],
})
export class RoleModule {}
