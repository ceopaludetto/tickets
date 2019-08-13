import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { static as ExpressStatic } from 'express';
import CookieParser from 'cookie-parser';
import RateLimit from 'express-rate-limit';
import Helmet from 'helmet';

import { ApplicationModule } from '@/server/app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(Helmet());
  app.use(CookieParser());
  app.use(
    new RateLimit({
      windowMs: 5 * 60 * 1000,
      max: 100,
      handler: (_, res) => {
        return res.status(429).send({
          message: 'Too many requests, please try again later.',
          status: 429,
          error: 'Rate limit error',
        });
      },
    })
  );
  app.use(
    process.env.PUBLIC_PATH as string,
    ExpressStatic(process.env.STATIC_FOLDER as string)
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.listen(process.env.PORT as string);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
