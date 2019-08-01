import { UnauthorizedException } from '@nestjs/common';

import { ContextType } from '@/server/utils/common.dto';

export function ExtractAuthTokenFromCookie({ req }: ContextType) {
  const authCookie = req.cookies.auth;

  if (!authCookie) {
    throw new UnauthorizedException('Falha na autenticação');
  }

  return authCookie;
}
