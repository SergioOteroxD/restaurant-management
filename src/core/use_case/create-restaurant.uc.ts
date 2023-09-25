import { HttpStatus, Injectable } from '@nestjs/common';
import { RestaurantDriver } from 'src/drivers';
import { Irestaurant } from '../entity/restaurant/restaurant.entity';
import { CustomException, IresponseBase, ResponseBase } from '../entity/common';
import { RESPONSE_CODE } from '../../commons/response-codes/general-codes';

@Injectable()
export class CreateRestaurant {
  constructor(private restaurantDriver: RestaurantDriver) {}
  async create(
    branchData: Partial<Irestaurant>,
  ): Promise<IresponseBase<any>> {
    try {
      await this.restaurantDriver.register(branchData);

      return new ResponseBase(
        {
          code: 'OK',
          message: 'La sucursal ha sido creada correctamente.',
        },
        HttpStatus.CREATED,
      );
    } catch (error) {
      if (error instanceof CustomException) throw error;
      throw new CustomException(
        RESPONSE_CODE.ERROR,
        'CreateRestaurant.create',
        error,
      );
    }
  }
}
