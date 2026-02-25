import { BadRequestException } from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // request
    const request = context.switchToHttp().getRequest();

    // header 
    const authHeader = request.headers['authorization'];

    
    if(!authHeader) throw new BadRequestException('Token Not Found')

      if(authHeader !== 'Bearer my-secret-token') throw new BadRequestException('Invalid Token');
    return authHeader === 'Bearer my-secret-token';
  }
}
