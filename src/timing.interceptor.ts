import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable() // внедрение зависимости, может быть внедрен в другие компоненты или контроллеры
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> { //Метод intercept перехватывает запрос и обрабатывает его.
    const now = Date.now();
    return next.handle().pipe(
      // цепочка обработки запросов
      tap(() => {
        // tap(): это оператор, который позволяет выполнить побочное действие(без измен данных потока)

        const dif = Date.now() - now;
        const response = context.switchToHttp().getResponse();
        response.header('Server-Timing', `server;dur=${dif}`);
      }),
    );
  }
}
// header() метод объекта ответа, который используется для установки HTTP заголовков.
// server;dur=${dif} значение, которое устанавливается для HTTP заголовка Server-Timing.
// имя http заголовка Server-Timing
