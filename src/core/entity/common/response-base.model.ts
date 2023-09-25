import { HttpStatus } from '@nestjs/common/enums';
import { Ipaginator, Paginator } from './paginator.model';
import { IresponseCode } from './response-code.interface';
import { RESPONSE_CODE } from '../../../commons/response-codes/general-codes';
import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { Reservation, Restaurant } from 'src/drivers/schema';

@ObjectType()
export class IresponseBase<T = any> {
  @Field(() => String)
  code: string;

  @Field(() => String)
  message: string;

  @Field(() => String)
  status?: HttpStatus;
}

export function PaginateResult<T>(ItemType: Type<T>): any {
  @ObjectType({ isAbstract: true, implements: [Ipaginator] })
  abstract class PageClass {
    @Field(() => String)
    code: string;

    @Field(() => String)
    message: string;

    // @Field(() => [ItemType])
    // data?: T[];

    @Field()
    pagination?: Ipaginator;
  }

  return PageClass;
}
@ObjectType()
export class ResponseBase<T = any> implements IresponseBase {
  public code: string;
  public message: string;

  constructor(
    responseCode: IresponseCode = RESPONSE_CODE.ERROR,
    public status: HttpStatus = HttpStatus.OK,
    public data?: T,
  ) {
    Object.assign(this, responseCode);
  }
}

export class ResponseQuery<T = any> implements IresponseBase<T> {
  @Field(() => String)
  public code: string;
  @Field(() => String)
  public message: string;
  
  @Field(() => String)
  public pagination?: Ipaginator;

  constructor(
    responseCode: IresponseCode = RESPONSE_CODE.ERROR,
    public data: T,
    page: number,
    limit: number,
    total: number,
    public status: HttpStatus = HttpStatus.OK,
  ) {
    Object.assign(this, responseCode);
    this.pagination = new Paginator(total, page, limit);
  }
}

@ObjectType()
export class RestaurantQuery extends PaginateResult(Restaurant) {
  public code: string;
  public message: string;
  public pagination?: Ipaginator;
  

  super(
    responseCode: IresponseCode = RESPONSE_CODE.ERROR,
    // data: Restaurant[],
    page: number,
    limit: number,
    total: number,
    status: HttpStatus = HttpStatus.OK,
  ) {
    Object.assign(this, responseCode);
    this.pagination = new Paginator(total, page, limit);
    // this.data = data;
    this.status = status;
  }
}

@ObjectType()
export class ReservationQuery extends PaginateResult(Reservation) {
  public code: string;
  public message: string;
  public pagination?: Ipaginator;
  

  super(
    responseCode: IresponseCode = RESPONSE_CODE.ERROR,
    // data: Restaurant[],
    page: number,
    limit: number,
    total: number,
    status: HttpStatus = HttpStatus.OK,
  ) {
    Object.assign(this, responseCode);
    this.pagination = new Paginator(total, page, limit);
    // this.data = data;
    this.status = status;
  }
}
