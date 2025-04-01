import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('guard..');
    console.log(
      'controller class name: ',
      context.getClass().name,
      ', ',
      'handler: ',
      context.getHandler().name,
    );
    const allRoles = this.reflector.get(Roles, context.getClass());
    const allRolesControllerAndMethod = this.reflector.getAllAndMerge(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(allRoles, allRolesControllerAndMethod);
    if (!allRoles) return true;
    const request = context.switchToHttp().getRequest();
    // const {
    //   rawHeaders: { role },
    // } = request;
    return true;
  }
}
