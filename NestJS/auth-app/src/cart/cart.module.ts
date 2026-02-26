import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';


@Module({
    imports: [TypeOrmModule.forFeature([Cart])],
    controllers: [CartController],
    providers: [CartService, CartRepository]


})
export class CartModule {}
