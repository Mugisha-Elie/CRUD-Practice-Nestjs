import { Injectable, type NestInterceptor, type ExecutionContext, type CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    console.log('[Interceptor] Before handled by controller...');

    return next.handle().pipe(
      map(data => {
        console.log('[Interceptor] After handled by controller (Transforming response)...')
        return {
          data,
          meta: {
            timestamp: new Date().toISOString(),
            path: context.switchToHttp().getRequest().url,
          }
        }
      })
    )
  }
}