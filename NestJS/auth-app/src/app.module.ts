import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';

import { User } from './users/user.entity';
import { Product } from './product/entities/product.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entities/cart.entity';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { MessageModule } from './message/message.module';
import { Message } from './message/message.entity';

@Module({
  imports: [
    // ✅ Load .env globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ Database connection
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),

        entities: [User, Product, Cart, Message],
        synchronize: true, // ❌ disable in production
      }),
    }),

    // ✅ Feature modules ONLY
    AuthModule,
    UsersModule,
    ProductModule,
    CartModule,
    OrdersModule,
    MessageModule,
  ],

  // ✅ Only root controller/service here
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}