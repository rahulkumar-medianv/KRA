import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './customer.interface';
import { CreateCustomerDTO } from './dto/createCustomer.dto';

@Injectable()
export class CustomerService {

    private customers: Customer[] = [];

    // Get All Customer
    getCustomer(): Customer [] {
        if(this.customers.length == 0) throw new NotFoundException("Customer List Empty")
        return this.customers;
    }

    // create customer
    createCustomer(customer: CreateCustomerDTO): Customer{
        const newCustomer: Customer = {
            id: Date.now().toString(),
            ...customer
        }
        this.customers.push(newCustomer);
        return newCustomer

    }


}
