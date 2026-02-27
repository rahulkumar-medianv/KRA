import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // Implement Swagger
  const config = new DocumentBuilder()
  .setTitle('Example API')
  .setDescription('API documentation for Example project')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('example')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('🚀 Server running at http://localhost:3000');
}
bootstrap();