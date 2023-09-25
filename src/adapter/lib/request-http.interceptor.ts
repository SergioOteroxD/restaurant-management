import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { IresponseHttp } from '../../core/entity/common/response-http.model';
import { GeneralUtils } from '../../commons/util/general.util';


/**
 * Intercepta todas la solicitudes http que llegen al servicio para formatear la respuesta
 */
@Injectable()
export class RequestHttpInterceptor implements NestInterceptor<IresponseHttp> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IresponseHttp> {
    const req = context.switchToHttp().getRequest();
    const { headers, method, url, params, query, body } = req;

    //Inicia traza
    const trace_id = GeneralUtils.getTraceId;
    Logger.debug(trace_id, {
      data: { headers, method, url, params, query, body },
      type: 'REQUEST',
      tags: 'REQUEST_TRANSACTION',
    });

    return next.handle().pipe(
      tap((_result: IresponseHttp) => {
        const { status, code, message } = _result;

        context.switchToHttp().getResponse().status(status);

        Logger.debug('INFO', 'Execution finished', {
          data: { status, code, message },
          type: 'RESPONSE',
          tags: ['RESULT_TRANSACTION', 'TRANSACTION_OK'],
        });
      }),
    );
  }
}
