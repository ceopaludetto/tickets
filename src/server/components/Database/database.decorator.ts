import { Inject } from '@nestjs/common';

import { SEQUELIZE_PROVIDER } from '@/server/utils/constants';

export function InjectModel<T>(model: new () => T) {
  return Inject(`${SEQUELIZE_PROVIDER}:${model.name}`);
}
