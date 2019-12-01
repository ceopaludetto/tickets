import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

interface ExtractOptions {
  shouldThrowException: boolean;
}

export function ExtractAuthTokenFromCookie(
  req: Request,
  { shouldThrowException = true }: ExtractOptions = {
    shouldThrowException: true,
  }
) {
  const authCookie = req.cookies.auth;

  if (!authCookie) {
    if (shouldThrowException) {
      throw new UnauthorizedException('Falha na autenticação');
    }
  }

  return authCookie;
}
