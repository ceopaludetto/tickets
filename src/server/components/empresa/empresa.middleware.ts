import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

@Injectable()
export class EmpresaMiddleware implements NestMiddleware {
  public use = (req: Request, _: Response, next: NextFunction) => {
    const { empresa } = req.headers;

    if (empresa) {
      req.empresa = new Types.ObjectId(empresa);
    }

    next();
  };
}
