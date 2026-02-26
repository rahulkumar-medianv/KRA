import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/createproduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(private productRepo: ProductRepository) {}

  async create(dto: CreateProductDTO) {
    return this.productRepo.createProduct(dto);
  }

  async findAll() {
    return this.productRepo.findAll();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: number, dto: UpdateProductDTO) {
    await this.findOne(id); // ensure exists
    return this.productRepo.updateProduct(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.productRepo.deleteProduct(id);

    return { message: 'Product deleted successfully' };
  }
}