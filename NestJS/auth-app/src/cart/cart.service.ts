
import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { AddCartDTO } from './dto/addCart.dto';

@Injectable()
export class CartService {
    constructor(private cartRepo: CartRepository) {}

    async addToCart(dto: AddCartDTO){
        return this.cartRepo.addToCart(dto);
    }

    async getCart(){
        return this.cartRepo.getCart();
    }
}
