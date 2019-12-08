import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

interface ExtractOptions {
  shouldThrowException: boolean;
}

export function ExtractAuthTokenFromCookie(
  req: Request,
  { shouldThrowException = true }: ExtractOptions = {
    shouldThrowException: false,
  }
) {
  const { auth } = req.cookies;

  if (!auth && shouldThrowException) {
    throw new UnauthorizedException('Falha na autenticação');
  }

  return auth;
}
