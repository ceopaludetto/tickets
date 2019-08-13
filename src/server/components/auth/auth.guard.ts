import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

import { ContextType } from '@/server/utils/common.dto';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  public canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req, res } = ctx.getContext<ContextType>();
    return super.canActivate(new ExecutionContextHost([req, res]));
  }
}
