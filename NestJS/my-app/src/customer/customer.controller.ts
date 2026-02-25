import { Customer } from './customer.interface';
import { CustomerService } from './customer.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCustomerDTO } from './dto/createCustomer.dto';
import { CustomerValidationPipe } from 'src/pipes/customer-validation.pipe';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {};

    @Get()
    getCustomer(){
        const customer = this.customerService.getCustomer();

        return {message: "Customer data fetch successfully", success: true, data: customer}
    }

    @Post()
    create(@Body(new CustomerValidationPipe()) body: CreateCustomerDTO) {
        const customer = this.customerService.createCustomer(body);
        
        return {message: "Create Customer Successfully", success: true, data: customer}
    }
}
