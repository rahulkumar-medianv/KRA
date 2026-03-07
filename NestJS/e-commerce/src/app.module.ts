import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datababseConfig } from './utils/db.config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
     // ✅ Load .env globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // database connection
    TypeOrmModule.forRootAsync(datababseConfig),

    // modules
    AuthModule,
    ProductsModule,
    OrdersModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
