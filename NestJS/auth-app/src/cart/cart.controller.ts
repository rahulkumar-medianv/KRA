import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CartService } from './cart.service';
import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AddCartDTO } from './dto/addCart.dto';

@Controller('cart')
export class CartController {
   constructor(private cartService: CartService) {};

   // Add to cart — extract userId from JWT token 
   @UseGuards(JwtAuthGuard)
   @Post()
   addToCart(@Request() req: any, @Body() dto: AddCartDTO){
   // userId comes from JWT token (set by JwtStrategy)
   //  const userId = req.user.userId;
   //  const item = {
   //    productId: dto.productId,

   //  }
    return this.cartService.addToCart(dto);
   }

   @UseGuards(JwtAuthGuard)
   @Get()
   getCart(){
    return this.cartService.getCart();
   }
}
