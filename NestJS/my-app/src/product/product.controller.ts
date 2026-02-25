import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ProductService } from './product.service';
import { Controller, Post, Body, Get, Param, Put, Delete, Patch, UseGuards} from '@nestjs/common';

@Controller('products')
export class ProductController {
    constructor(private readonly ProductService: ProductService) {};

    // Create Product
    @Post()
    createProduct(@Body() body){
        return this.ProductService.createProduct(body);
    }

    // Get All Product
    @Get()
    
    @UseGuards(AuthGuard) // only auth person will access this route 
    getAllProducts(){
        return this.ProductService.getAllProducts();
    }

    // Get product By id
    @Get(':id')
    getProductById(@Param('id') id: string){
        return this.ProductService.getProductById(id)
    }

    // Update Product
    @Patch(':id')
    updateProduct(@Param('id') id: string,  @Body() body){
        return this.ProductService.updateProduct(id, body)
    }

    // Delete product
    @Delete(':id')
    deleteProduct(@Param('id') id: string){
        return this.ProductService.deleteProduct(id);
    }
}
