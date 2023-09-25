import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ReservationDriver, RestaurantDriver } from 'src/drivers';
import { CustomException, IresponseBase, ResponseBase } from '../entity/common';
import { RESPONSE_CODE } from '../../commons/response-codes/general-codes';
import { Ireservation } from '../entity/reservation/reservation.interface';

@Injectable()
export class CreateReservation {
  constructor(
    private reservationDriver: ReservationDriver,
    private restaurantDriver: RestaurantDriver,
  ) {}
  async create(branchData: Partial<Ireservation>): Promise<IresponseBase<any>> {
    try {
      branchData.reservationDate == new Date(branchData.reservationDate);
      const restaurant = await this.restaurantDriver.getById(
        branchData.restaurantId,
      );
      if (!restaurant)
        return new ResponseBase(
          {
            code: 'NOT_FOUND',
            message: 'No exite ese restaurante',
          },
          HttpStatus.NOT_FOUND,
        );

      const restaurantsNumber = await this.reservationDriver.getTotal({
        restaurantId: branchData.restaurantId,
        reservationDate: branchData.reservationDate,
      });
      if (restaurantsNumber == 10)
        return new ResponseBase(
          {
            code: 'CONFLICT',
            message: 'Para esta Fecha no puedes reservar',
          },
          HttpStatus.CONFLICT,
        );
      await this.reservationDriver.register(branchData);

      return new ResponseBase(
        {
          code: 'OK',
          message: 'La reservación ha sido creada correctamente.',
        },
        HttpStatus.CREATED,
      );
    } catch (error) {
      if (error instanceof CustomException) throw error;
      throw new CustomException(
        RESPONSE_CODE.ERROR,
        'CreateReservation.create',
        error,
      );
    }
  }
}
