import { Injectable, NotFoundException } from '@nestjs/common';

// define the Product type
 export interface Product {
    id: string;
    name: string;
    price: number;
}


@Injectable()
export class ProductService {
    
    // Store all products
    private products:  Array<Product> = [
        {id: "123", name: "POCO C3", price: 2300}, {id: "234", name: "MSI Laptop", price: 31000}
    ]

    // Create product methods
    createProduct(product: Product){

        // in future validation handle in DTO 
       const {name, price} = product;
       if(!name || !price) return {message: "All Fields are required", success: false};

       product = {
        id: Date.now().toString(),
        name,
        price
        
       }
        this.products.push(product);
        
        return {message: "Product created successfully", success: true, data: product}

    }

    // get All product methods
    getAllProducts(){
    
        if(this.products.length == 0) return {message: "Product list empty"}; // Check products list

        return {message: "Products Fetch successfully", success: true, data: this.products}
    }

    // Get product By ID
    getProductById(id: string){

        // find the product 
        const product = this.products.find((prod) => prod.id == id);

        // product not found
        if(!product) throw new NotFoundException("Product not Found");


        return {message: "Product Details", success: true, data: product};
        
    }

    // update Product By Id
    updateProduct(id: string, data: Product){

        // find product
        const product = this.products.find((prod) => prod.id == id);

        if(!product) throw new NotFoundException("Product not found");

       if(data.name) product.name = data.name;
       if(data.price) product.price = data.price;

        return {message: "Product Update Successfully", success: true, data: product}


    }

    // Delete Product By Id
    deleteProduct(id: string){
        // Find the product Index in Array
        const index = this.products.findIndex((prod) => prod.id == id)

        // index == -1 means the product id is not found in the Array
        if(index == -1) throw new NotFoundException("Product not Found");

        // splice method use to remove the element from the index 
        this.products.splice(index, 1);

        // finally send the response to the user
        return {message: "Deleted Successfully"}

    }
}
