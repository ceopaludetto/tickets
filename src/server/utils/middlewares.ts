import { INestApplication, ValidationPipe } from '@nestjs/common';
import { static as ExpressStatic } from 'express';
import CookieParser from 'cookie-parser';
import Helmet from 'helmet';
import Compression from 'compression';

import { IS_PRODUCTION, PUBLIC_PATH, STATIC_FOLDER } from '@/server/utils/constants';

export function middlewares(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }));

  app.use(CookieParser());

  if (IS_PRODUCTION) {
    app.use(Compression());
    app.use(Helmet());
  }

  app.use(
    PUBLIC_PATH,
    ExpressStatic(STATIC_FOLDER, {
      maxAge: IS_PRODUCTION ? '1y' : undefined,
    })
  );
}
