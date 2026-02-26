import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe — validates all incoming request bodies using DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // Strip unknown fields from request body
      forbidNonWhitelisted: true,  // Throw error if unknown fields are sent
      transform: true,             // Auto-convert types (e.g., string → number)
    }),
  );

  await app.listen(3000);
  console.log('🚀 Server running at http://localhost:3000');
}
bootstrap();