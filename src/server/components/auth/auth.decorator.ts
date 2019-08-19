import { createParamDecorator } from '@nestjs/common';

import { ContextType } from '@/server/utils/common.dto';

export const User = createParamDecorator(
  (data, [, , ctx]) => (ctx as ContextType).req.user
);
