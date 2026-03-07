import { OrdersController } from './orders.controller';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './entities/orders.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Module({

    imports: [TypeOrmModule.forFeature([OrdersEntity, ProductEntity])],
    controllers:[OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {}
