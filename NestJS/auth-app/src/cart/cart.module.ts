import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { User } from 'src/users/user.entity';
import { Product } from 'src/product/entities/product.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Cart, User, Product])],
    controllers: [CartController],
    providers: [CartService, CartRepository]


})
export class CartModule {}
