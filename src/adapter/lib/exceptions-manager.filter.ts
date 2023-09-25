import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { RESPONSE_CODE } from '../../commons/response-codes/general-codes';
import { CustomException, IresponseHttp, ResponseHttp } from '../../core/entity/common';

@Catch()
export class ExceptionManager implements ExceptionFilter {
  // ...
  async catch(exception, host: ArgumentsHost) {
    console.log('🚀 - file: exceptions-manager.filter.ts:10 - ExceptionManager - exception:', exception)
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    Logger.error('ERROR', 'General exception', exception.context ?? 'ExceptionManager', {
      data: exception,
      type: 'EXCEPTION',
      tags: ['UNCATCH_EXCEPTION'],
    });

    const result: IresponseHttp = new ResponseHttp();

    if (exception instanceof CustomException) {
      result.status = HttpStatus.BAD_GATEWAY;
      result.code = exception.code;
      result.message = exception.message;
    }

    if (exception instanceof HttpException) {
      if (exception.getStatus() != 500) {
        result.status = exception.getStatus();
        result.code = exception.getResponse()['code'] ?? RESPONSE_CODE[result.status].code ?? result.code;
        result.message = RESPONSE_CODE[result.status].message ?? result.message;

      }
    }

    const datailsLogger = {
      data: {
        status: result.status,
        code: result.code,
        message: result.message,
      },
      type: 'EXCEPTION',
      tags: ['RESULT_TRANSACTION', 'TRANSACTION_ERROR'],
    };

    Logger.error('ERROR', 'Execution finished with exception.', datailsLogger);

    response.status(result.status).json(result);
  }
}
