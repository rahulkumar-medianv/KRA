import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/createproduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import {Role} from "../common/enums/role.enum"
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  // CREATE
    
@UseGuards(JwtAuthGuard, RolesGuard) // only logged in person will access this route
  // Client Sends request Guard runs Before controller
 @Roles(Role.ADMIN)
 @Post()
create(@Body() dto: CreateProductDTO) {
    return this.productService.create(dto);
  }

  /*
  In create product controller have Role based Auth
  1. check JwtAuthGuard -- Is token valid
  2. Check Roles -- Does user have required role
  */

  // READ ALL
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // READ ONE
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  // UPDATE
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDTO,
  ) {
    return this.productService.update(id, dto);
  }

  // DELETE
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}