import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(context.getHandler().name, context.getClass().name);
    return this.validateRequest(request);
  }
  // do not place validate fxn here so as to not violate SRP
  private validateRequest(value: any) {
    return value;
  }
}
