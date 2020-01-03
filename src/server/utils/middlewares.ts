import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import Compression from 'compression';
import Cookie from 'cookie-parser';
import { static as Static } from 'express';
import Helmet from 'helmet';

import { IS_PRODUCTION, PUBLIC_PATH, STATIC_FOLDER } from '@/server/utils/constants';

export function installMiddlewares(app: NestExpressApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(Cookie());

  if (IS_PRODUCTION) {
    app.use(Compression());
    app.use(Helmet());
  }

  app.use(
    PUBLIC_PATH,
    Static(STATIC_FOLDER, {
      maxAge: '1y',
    })
  );
}
