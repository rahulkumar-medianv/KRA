import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDTO } from './dto/createProduct.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/auth.interface';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateProductDTO } from './dto/updateProduct.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}
    
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.CONTENT_MANAGER)
    @HttpCode(HttpStatus.CREATED)
    async createProduct(@Body() body: CreateProductsDTO){
        return this.productService.createProduct(body);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getAllproducts(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('sort') sort: 'ASC' | 'DESC'

    ){
        return this.productService.getAllProducts(page, limit, sort);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async productgetById(
       @Param('id') id: string
    ){
        return this.productService.productgetById(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.CONTENT_MANAGER)
    @HttpCode(HttpStatus.OK)
    async updateproduct(
        @Param('id') id: string, 
        @Body() product: UpdateProductDTO
    ){
        return this.productService.updateProduct(id, product)
    }

    @Patch('/remove/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.CONTENT_MANAGER)
    @HttpCode(HttpStatus.OK)
    async removeProduct(
        @Param('id') id: string
    ){
        return this.productService.removeProduct(id);
    }  

}
