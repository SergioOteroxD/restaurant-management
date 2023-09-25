import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { RestaurantDriver } from 'src/drivers';
import { IqueryRestaurantFilter } from '../entity/restaurant/query-restaurant-filter.entity';
import { IresponseBase } from '../entity/common';
import { ResponseBase } from '../entity/common/response-base.model';
import { RESPONSE_CODE } from '../../commons/response-codes/general-codes';
import { SUCCESSFUL_CODES } from '../../commons/response-codes/successful-codes';

@Injectable()
export class QueryRestaurant {
  constructor(private brancDriver: RestaurantDriver) {}

  async getAll(
    page: number,
    limit: number,
    _filter: IqueryRestaurantFilter,
    // _sort: { by: EqueryOrderBy; type: EqueryOrder },
  ): Promise<any[]> {
    const filter = {};
    if (_filter?.city != undefined) filter['city'] = { $in: _filter.city };

    if (_filter?.name != undefined) filter['name'] = _filter.name;
    if (_filter?.firtCharCity != undefined)
      filter['city'] = {
        $regex: new RegExp(`^${_filter.firtCharCity}`),
        $options: 'i',
      };

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

  async getById(userId: string): Promise<IresponseBase<any>> {
    const userInfo = await this.brancDriver.getById(userId);
    if (!userInfo)
      return new ResponseBase(RESPONSE_CODE.NOT_FOUND, HttpStatus.NOT_FOUND);

    return new ResponseBase(SUCCESSFUL_CODES.QUERY_OK, HttpStatus.OK, userInfo);
  }
}
