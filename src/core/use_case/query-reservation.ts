import { Injectable, NotFoundException } from '@nestjs/common';
import { ReservationDriver } from 'src/drivers';
import { IqueryReservationFilter } from '../entity/reservation/query-reservation-filter.entity';

@Injectable()
export class QueryReservation {
  constructor(private brancDriver: ReservationDriver) {}

  async getAll(
    page: number,
    limit: number,
    _filter: IqueryReservationFilter,
    // _sort: { by: EqueryOrderBy; type: EqueryOrder },
  ): Promise<any[]> {
    const filter = {};
    if (_filter?.email != undefined) filter['email'] = { $in: _filter.email };

    if (_filter?.restaurantId != undefined)
      filter['restaurantId'] = _filter.restaurantId;

    const total: number = await this.brancDriver.getTotal(filter);

    if (total == 0) new NotFoundException();

    //validamos orden
    // const sortProperty = _sort?.by ?? '_id';
    // const sortValue = _sort?.type == EqueryOrder.DESC ? -1 : 1;
    // const sort = {};
    // sort[sortProperty] = sortValue;

    const data = await this.brancDriver.getAll(page, limit, filter);

    return data;
  }

  async getById(userId: string): Promise<any> {
    const userInfo = await this.brancDriver.getById(userId);
    if (!userInfo) new NotFoundException();

    return userInfo;
  }
}
