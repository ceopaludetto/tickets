import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { static as Static } from 'express';
import { useContainer as ClassValidatorWrapper } from 'class-validator';

import Cookie from 'cookie-parser';
import Helmet from 'helmet';
import Compression from 'compression';

import { IS_PRODUCTION, PUBLIC_PATH, STATIC_FOLDER } from '@/server/utils/constants';

export function installMiddlewares(app: NestExpressApplication) {
  ClassValidatorWrapper(app, { fallback: true });
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
