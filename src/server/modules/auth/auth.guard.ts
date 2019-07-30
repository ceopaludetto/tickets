import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ContextType } from '@/server/utils/common.dto';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  public getRequest = (context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<ContextType>();
  };
}
