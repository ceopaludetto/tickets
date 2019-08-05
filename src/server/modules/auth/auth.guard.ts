import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { ACGuard } from 'nest-access-control';

import { ContextType } from '@/server/utils/common.dto';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  public canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req, res } = ctx.getContext<ContextType>();
    return super.canActivate(new ExecutionContextHost([req, res]));
  }
}

@Injectable()
export class GqlACGuard extends ACGuard {
  protected getUser = (context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<ContextType>().req.user;
  };

  protected async getUserRoles(context: ExecutionContext) {
    const user = this.getUser(context);
    if (!user) throw new UnauthorizedException();
    return user.permissao;
  }
}
