import { InterfaceType, Field, Int } from '@nestjs/graphql';

@InterfaceType()
export abstract class Ipaginator {
  @Field(()=>Int)
  readonly previousPageIndex?: number;
  @Field(()=>Int)
  readonly nextPageIndex?: number;
  @Field(()=>Int)
  readonly totalPages: number;
  @Field(()=>Int)
  readonly totalDocuments: number;
  @Field(()=>Int)
  readonly pageIndex: number;
  @Field(()=>Int)
  readonly pageSize: number;
}

export class Paginator {
  readonly previousPageIndex: number | null;
  readonly nextPageIndex: number | null;
  readonly totalPages: number;
  readonly totalDocuments: number;
  readonly pageIndex: number;
  readonly pageSize: number;

  constructor(_totalDocuments: number, _pageIndex: number, _pageSize: number) {
    this.totalDocuments = _totalDocuments;
    this.pageIndex = _pageIndex;
    this.pageSize = _pageSize;
    const tp = Math.trunc(_totalDocuments / this.pageSize);
    this.totalPages = _totalDocuments % this.pageSize > 0 ? tp + 1 : tp;
    this.previousPageIndex = this.pageIndex > 1 ? this.pageIndex - 1 : null;
    this.nextPageIndex = this.pageIndex < this.totalPages ? this.pageIndex + 1 : null;
  }
}
