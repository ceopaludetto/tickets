import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import Compression from 'compression';
import Cookie from 'cookie-parser';
import Csurf from 'csurf';
import { static as Static } from 'express';
import Helmet from 'helmet';

import { PUBLIC_PATH, STATIC_FOLDER } from '@/server/utils/constants';

export function installMiddlewares(app: NestExpressApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(Cookie());
  app.use(
    Csurf({
      cookie: {
        key: 'XSRF-TOKEN',
      },
    })
  );

  if (process.env.NODE_ENV === 'production') {
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
