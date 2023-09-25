import { HttpStatus } from '@nestjs/common';
import { IresponseCode } from './response-code.interface';

export interface IcustomException extends IresponseCode {
  readonly context: string;
  readonly type: 'Business' | 'Technical';
  readonly details?: any;
  readonly status?: HttpStatus;
}

export class CustomException implements IcustomException {
  public readonly code: string;
  public readonly message: string;
  public readonly status?: HttpStatus;
  public details?: any;

  constructor(
    error: IresponseCode,
    public readonly context: string,
    public readonly type: 'Business' | 'Technical',
    details?: any,
  ) {
    this.code = error.code;
    this.message = error.message;
    this.details = details;
  }
}
