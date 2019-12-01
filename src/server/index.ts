import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from '@/server/app.module';
import { installMiddlewares } from '@/server/utils/middlewares';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  installMiddlewares(app);

  app.listen(process.env.PORT as string);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
