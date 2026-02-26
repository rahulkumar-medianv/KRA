import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import {ConfigModule} from '@nestjs/config'
import { CustomerController } from './customer/customer.controller';
import { CustomerModule } from './customer/customer.module';
import { CustomerService } from './customer/customer.service';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { DatabaseModule } from './database/database.module';
import { LoggerService } from './logger/logger.service';
import { LoggerProvider } from './logger/logger.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule, ProductModule, CustomerModule, DatabaseModule],
  controllers: [AppController, UserController, CustomerController, DatabaseController],
  providers: [AppService, UserService, ProductService, CustomerService, DatabaseService, LoggerProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(LoggerMiddleware)
      .forRoutes("*")
  }
}

/*

The main Container of app.
Responsibilities: 
Registers modules, Registers providers, Defines application scope (NestJS starts dependency injection from here)

*/