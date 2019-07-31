import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { static as ExpressStatic } from 'express';
import CookieParser from 'cookie-parser';

import { ApplicationModule } from '@/server/app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(CookieParser());
  app.use(
    process.env.PUBLIC_PATH as string,
    ExpressStatic(process.env.STATIC_FOLDER as string)
  );
  app.listen(process.env.PORT as string);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
