import { Inject } from '@nestjs/common';

import { SEQUELIZE_PROVIDER } from '@/server/utils/constants';

export const InjectModel = (m: () => Function) => Inject(`${SEQUELIZE_PROVIDER}:${m().name}`);

export const InjectSequelize = () => Inject(SEQUELIZE_PROVIDER);

export { Sequelize } from 'sequelize-typescript';
