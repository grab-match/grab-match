import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { SwaggerConfig } from './config/docs/swagger.config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api');

  // Enable versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Swagger configuration
  SwaggerConfig.config(app);

  // CORS
  app.enableCors();

  // Cookie parser
  app.use(cookieParser());

  // Enable versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
