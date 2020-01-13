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
  const { AUTH } = req.cookies;

  if (!AUTH && shouldThrowException) {
    throw new UnauthorizedException('Falha na autenticação');
  }

  return AUTH;
}
