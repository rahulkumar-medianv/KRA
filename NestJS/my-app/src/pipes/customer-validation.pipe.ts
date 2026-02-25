import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CustomerValidationPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        const {name, email, age} = value;

        // Validate Name
        if(!name || typeof name !== 'string') throw new BadRequestException('Name is required and must be string');

        if(name.length < 4) throw new BadRequestException('Name must be at least 4 characters');

        // Email Validation
        if(!email || typeof email !== 'string') throw new BadRequestException('Email is required');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)) throw new BadRequestException('Invalid email format')

        // Age Validation
        const numberAge = Number(age);
        if(isNaN(numberAge)) throw new BadRequestException('Age must be a number');

        if(numberAge < 18) throw new BadRequestException('Age must be 18 or above')

            value.age = numberAge;

            return value


    }
}