import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { AuthService } from './auth.service';
import { ExtractAuthTokenFromCookie } from '@/server/utils/jwt.cookie.extractor';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly authService: AuthService;

  public constructor(authService: AuthService) {
    this.authService = authService;
  }

  public use = async (req: Request, res: Response, next: NextFunction) => {
    const authToken = ExtractAuthTokenFromCookie(req, {
      shouldThrowException: false,
    });

    if (!authToken) {
      return next();
    }

    try {
      const payload = await this.authService.verify(authToken);
      req.user = payload;
      return next();
    } catch (err) {
      return next(err);
    }
  };
}
