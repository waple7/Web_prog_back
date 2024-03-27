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
        // tap():(для вып побочных действий) выполняются после завершения обработки запроса,и добавляют HTTP заголовок Server-Timing к ответу
        // результат выполнения next.handle() не изменяется,  (результат потока данных не изменится)
        const dif = Date.now() - now;
        const response = context.switchToHttp().getResponse(); //возвращает объект http
        response.header('Server-Timing', `server;dur=${dif}`);
      }),
    );
  }
}
// header() метод объекта ответа, который используется для установки HTTP заголовков.Server-Timing к ответу
// server;dur=${dif} значение, которое устанавливается для HTTP заголовка Server-Timing.
// имя http заголовка Server-Timing
// Интерсептор в контексте  позволяет перехватывать запросы и ответы в рамках обработки HTTP запросов