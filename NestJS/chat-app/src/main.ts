import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // Strip unknown fields from request body
      forbidNonWhitelisted: true,  // Throw error if unknown fields are sent
      transform: true,             // Auto-convert types (e.g., string → number)
    }),
  );
  const PORT = Number(process.env.PORT)
  await app.listen(PORT);
  console.log(`Server Running at http://localhost:${PORT}`)
}
bootstrap();
