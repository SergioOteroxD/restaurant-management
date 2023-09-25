import { Module } from '@nestjs/common';
import { DriversModule } from '../drivers/drivers.module';
import {
  CreateReservation,
  CreateRestaurant,
  QueryReservation,
} from './use_case';
import { QueryRestaurant } from './use_case/query-restaurant';

@Module({
  imports: [DriversModule],
  providers: [
    CreateRestaurant,
    QueryRestaurant,
    CreateReservation,
    QueryReservation,
  ],
  exports: [
    CreateRestaurant,
    QueryRestaurant,
    CreateReservation,
    QueryReservation,
  ],
})
export class CoreModule {}
