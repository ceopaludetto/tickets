import { INestApplication, ValidationPipe } from '@nestjs/common';
import { static as ExpressStatic } from 'express';
import CookieParser from 'cookie-parser';
import Helmet from 'helmet';
import Compression from 'compression';

import { IS_PRODUCTION } from '@/server/utils/constants';

export function middlewares(app: INestApplication) {
  app.use(CookieParser());

  if (IS_PRODUCTION) {
    app.use(Compression());
    app.use(Helmet());
  }

  app.use(
    process.env.PUBLIC_PATH as string,
    ExpressStatic(process.env.STATIC_FOLDER as string)
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
}
