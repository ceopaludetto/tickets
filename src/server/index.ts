import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from '@/server/app.module';
import { middlewares } from '@/server/utils/middlewares';
import { Logger } from '@/server/customs/logger';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, {
    logger: new Logger(),
  });
  middlewares(app);

  app.listen(process.env.PORT as string);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
