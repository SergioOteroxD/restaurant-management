import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Reservation,
  ReservationSchema,
  Restaurant,
  RestaurantSchema,
} from './schema';
import { RestaurantDriver } from './restaurant.driver';
import { ReservationDriver } from './reservation.drivers';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongo_uri'),
        retryAttempts: 3,
        autoCreate: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
        collection: 'coll_restaurant',
      },
      {
        name: Reservation.name,
        schema: ReservationSchema,
        collection: 'coll_reservation',
      },
    ]),
  ],
  providers: [RestaurantDriver, ReservationDriver],
  exports: [RestaurantDriver, ReservationDriver],
})
export class DriversModule {}
