/*
NestJS Complete Learning Path
- Foundation & setup (core Basics)
- Core Architecture (Modules, Controllers, Services, Dependency Injection)
- Request Lifecycle (core concept)
- Request Processing Components (Middleware, Guards, Pipes, Interceptors, Exception Filters)
- Custom Decorators (Advanced nestJS)
Setup
↓
Modules
↓
Controllers
↓
Services
↓
Dependency Injection
↓
Middleware
↓
Guards
↓
Pipes + DTO Validation
↓
Interceptors
↓
Exception Filters
↓
Custom Decorators
↓
Request Lifecycle Deep Dive

*/

/*
Files and Folder Structure

- Package.json -- The brain of your Project dependencies contains: installed libraries, scripts to run the app


- Package-lock.json -- Locks exact dependency versions., Ensures project runs the same on every machine.

- eslint.config.mjs -- Code quality checker. (detects bad patterns, warns about unused variables)

- tsconfig.json -- Main TypeScript configuration. (compilation rules, decorators support, module resolution)

- node_modules -- All Installed npm packages.

- dist -- compiled javascript output. (NestJS converts: -- typescript -> javaScript) Generated after build (npm run build)

- test -- Contains end to end tests. used to test APIs like real HTTp requests. 

-- Src Folder (Application Entry Point)

--- Main.ts 
*/

/*
Always use @Injectable() decorator on services.
Inject service into controllers using constructor injection
*/

/*
Request
   ↓
Middleware
   ↓
Guard
   ↓
Pipe
   ↓
Controller
   ↓
Service
   ↓
Response

*/

/*
Pipes -- A Pipe is a class that runs before controller method it validate data, Transform data, reject invalid request

Custom Pipe -- Custom Pipe is own validation or transformation logic that runs before the controller executes.

- Built-in pipes are not enough
- need special validation
- transform data 

Request Flow
---------------
 Request --> Custom Pipe --> Controller --> service

 ex: Custom Pipe (Validate Customer Age)
 we will create a pipe that: ensures age is a number & age must be >= 18

 step 1: Generate Pipe
 - nest g pipe age-validation

 step 2: Implement pipe: age-validation.pipe.ts
 
 import {PipeTransform, Injectable, BadRequestException} from '@nestjs/common';

 @Injectable()
 export class AgeValidationPipe implements PipeTransform {
 transform(value: any){
 const age = Number(value);
 if(NaN(age)) throw new BadRequestException('Age must be a number');

 if(age < 18) throw new BadRequestException('Customer must be 18+')

 return age;
 }
 
 }

 step 3: use Pipe in Controller
 @Get(':id')
 getByAge(@Param('age', AgeValidationPipe) age: number){
 return age;
 }




*/

/*

Exception Filters in NestJS
centralized error handling -> Exception Filters allow you to: Catch errors globally or per controller
- Format API responses consistenly
- Log errors
- Hide sensitive information
- Transform errors into clean API responses

### Default NestJS Exception handling -- NestJS already handles errors like:
-- throw new NotFoundException('User not Found');

output JSON:
{
"statusCode": 404,
"message": "user not found",
"error": "not Found"
}

but in real apps you way want: JSON

{
"success": false,
"timestamp": "2026-02-25T10:00:00Z",
"path": "/users/1",
"message": "User not found"
}

That's where Eception Filters come in:



STEP 1: Create Exception Filter: filter/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {

    // switch context (HTTP / GraphQL / WS)
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: exceptionResponse,
    });
  }
}

STEP 2: Use the Filter: Controller level
@UseFilters(HttpExceptionFilter)
@Controller('users)
export class UsersController {}




*/

/*
Decorators in NestJS -- A function that adds metadata or behavior to a class, method, or parameter.
- Attach extra power without changing core logic.

class Decorators --- @Controller(), @Injectable(), @Module()
Method Decorators --- @Get(), @Post(), @Put()
Parameter Decorators --- @Body(), @param(), @Query()


*/

/*

Guards - classes that implement logic to decide whether a request is allowed or not.
- they implement the CanActive interface and run before the route handler.
- Mostly used for authentication & authorization.

How to create Guard -- nest g guard guards/auth

*/

/*

----- Lifecycle Events





*/
