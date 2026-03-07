import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductsDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>
    ) {}
    
    async createProduct(productData: CreateProductsDTO){
        // create product
        const product = this.productRepo.create(productData);
        // save product into database
        const saveProduct = await this.productRepo.save(product);
        return {message: "product added successfully", data: saveProduct}
    }

    async getAllProducts(page: number = 1, limit: number = 10, sort: 'ASC' | 'DESC') {
        const offset = (page - 1) * limit;

        const [products, total] = await this.productRepo.findAndCount({
            skip: offset,
            take: limit,
            order: {
                price: sort
            },
            where: {
                isActive: true
            }
        });
        
        return {
            message: "Fetch All products",
            sort,
            page,
            limit,
            total,
            totalPages: Math.ceil(total/limit),
            data: products

        }
    }

    async productgetById(id: string){
        // find product
        const findProduct = await this.productRepo.findOne({where: {id, isActive: true}})

         if(!findProduct) return {message: "product Not Found"};

         return {
            message: "Fetch product",
            data: findProduct
         }

    }

    async updateProduct(id: string, productData: UpdateProductDTO){
        // find product
        const findProduct = await this.productRepo.findOne({where:{
            id: id
        }})

        if(!findProduct) return {message: "product Not Found"};
        
        await this.productRepo.update(id, productData);
        const updatedProduct = await this.productRepo.findOne({
            where: {
                id: id
            }
        })

        return {
            message: "Product Update Successfully",
            data: updatedProduct
        }

    }

    async removeProduct(id: string){
        // find product
        const findProduct = await this.productRepo.findOne({where: {id}})

        if(!findProduct) return {message: "product Not Found"};

        await this.productRepo.update(id, {isActive: false});

        const updatedproduct = await this.productRepo.findOne({where: {id}});
        
        return{
            message: "product removed successfully",
            data: updatedproduct
        }
    }
}
