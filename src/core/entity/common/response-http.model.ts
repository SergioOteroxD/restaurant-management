import { HttpStatus } from '@nestjs/common';
import { IresponseBase, ResponseBase } from './response-base.model';
import { GeneralUtils } from '../../../commons/util/general.util';
import { Field, registerEnumType, ObjectType } from '@nestjs/graphql';


export interface ImetaResponse {
  readonly traceId: string;
  readonly requestId?: string;
}

export abstract class IresponseHttp<T = any> extends IresponseBase<T> {
  meta: ImetaResponse;
  status: HttpStatus;
}

registerEnumType(HttpStatus,{name:'HttpStatus'})

@ObjectType()
export class ResponseHttp implements IresponseHttp {
  
  @Field(()=> String)
  code: string;
  
  @Field(()=> String)
  message: string;
  
  
  @Field(type => HttpStatus)
  status: HttpStatus;
  
  meta: ImetaResponse;

  

  constructor(status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR, result: IresponseBase = new ResponseBase()) {
    this.meta = { traceId: GeneralUtils.getTraceId };
    this.status = status;
    this.result = result;
  }

  /**
   *
   */
  public set result(result: IresponseBase) {
    Object.assign(this, result);
  }
}
