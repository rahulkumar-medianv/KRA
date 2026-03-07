import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT
  const dataSource = app.get(DataSource);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(Number(PORT)).then(()=> {
    console.log( `Server is Running http://localhost:${PORT}`)
  }).catch((error) => {
    console.log(`something went wrong ${error}`)
  })

  
  if(dataSource.isInitialized){
    console.log("Database Connected Successfully");
  }else{
    console.log("Database Connection Failed");
  }
}
bootstrap();
