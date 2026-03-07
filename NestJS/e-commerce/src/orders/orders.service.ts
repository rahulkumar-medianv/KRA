import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
    order(){
        return 'this is dummy end point'
    }
}
