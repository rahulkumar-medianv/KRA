import { Controller, Get } from '@nestjs/common';

@Controller('cart')
export class CartController {
    @Get()
    getCartItems(){
        return "This is Cart"
    }
}
