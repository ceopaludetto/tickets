import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export function ExtractAuthTokenFromCookie(req: Request) {
  const authCookie = req.cookies.auth;

  if (!authCookie) {
    throw new UnauthorizedException('Falha na autenticação');
  }

  return authCookie;
}
