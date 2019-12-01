import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator((data, [, , ctx]) => (ctx.req as Request).user);
