import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer as injectApplicationModule } from 'class-validator';

import { ApplicationModule } from '@/server/app.module';
import { installMiddlewares } from '@/server/utils/middlewares';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);
  installMiddlewares(app);
  injectApplicationModule(app.select(ApplicationModule), { fallbackOnErrors: true });

  app.listen(process.env.PORT as string);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
