import { Provider } from '@nestjs/common';
import { PubSub } from 'apollo-server-express';

import { PUB_SUB } from '@/server/utils/constants';

export const PubSubProvider: Provider = {
  provide: PUB_SUB,
  useValue: new PubSub(),
};
