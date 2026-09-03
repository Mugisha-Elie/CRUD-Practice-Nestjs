import {NestFactory} from '@nestjs/core'
import { AppModule } from './app.module.js'
import { AllExceptionFilter } from './filters/all-exceptions.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.useGlobalFilters(new AllExceptionFilter())
  
  await app.listen(3000);
}

bootstrap()
