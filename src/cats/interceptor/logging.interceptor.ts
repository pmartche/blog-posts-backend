import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('interceptor before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`interceptor after... ${Date.now() - now}ms`)),
      );
  }
}
