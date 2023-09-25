import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Reservation } from 'src/drivers/schema';
import { ResponseHttp } from '../../../core/entity/common/response-http.model';
import { CreateReservation } from '../../../core/use_case';
import { CreateReservationDto } from 'src/adapter/dto/input/reservation/create-reservation.dto';
import { FilterReservationArg } from '../../dto/arg/reservation/filter-reservation.arg';
import { QueryReservation } from '../../../core/use_case';

@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(
    private createReservation: CreateReservation,
    private queryReservation: QueryReservation,
  ) {}
  @Mutation(() => ResponseHttp)
  async createReservationR(
    @Args('createReservationInput') createRestaurantInput: CreateReservationDto,
  ) {
    const result = await this.createReservation.create(createRestaurantInput);
    return new ResponseHttp(result.status, result);
  }

  @Query(() => [Reservation])
  getAllReservation(
    @Args('limit', { type: () => Int, nullable: true }) limit: number = 25,
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
    @Args('FilterReservationArg', { nullable: true })
    filterArg: FilterReservationArg,
  ) {
    return this.queryReservation.getAll(page, limit, filterArg);
  }

  @Query(() => Reservation)
  getOneReservation(
    @Args('reservationId', { type: () => String }) id: string,
  ) {
    return this.queryReservation.getById(id);
  }
}
