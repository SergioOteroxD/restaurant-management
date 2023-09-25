import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { validate } from './config/env.validation';
import restaurantConfig from './config/restaurant.config';
import reservationConfig from './config/reservation.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      cache: true,
      load: [databaseConfig, restaurantConfig, reservationConfig],
      expandVariables: true,
    }),
  ],
})
export class CommonsModule {}
