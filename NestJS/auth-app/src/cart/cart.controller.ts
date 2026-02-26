import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CartService } from './cart.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AddCartDTO } from './dto/addCart.dto';

@Controller('cart')
export class CartController {
   constructor(private cartService: CartService) {};

   // add to cart
   @UseGuards(JwtAuthGuard)
   @Post()
   addToCart(@Body() dto: AddCartDTO){
    return this.cartService.addToCart(dto);
   }


   @UseGuards(JwtAuthGuard)
   @Get()
   getCart(){
    return this.cartService.getCart();
   }
}
