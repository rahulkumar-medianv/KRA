import { Controller , Get} from '@nestjs/common';

@Controller('user') // Decorator
export class UserController {

    @Get()
    getUser(){
        return "User Data Fetched Successfully"
    };

    @Get('/:id')
    getUserById(){
        return "User details fetched successfully"
    }
}
