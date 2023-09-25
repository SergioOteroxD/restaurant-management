import { Module } from '@nestjs/common';
import { RestaurantResolver } from './api/restaurant/restaurant.resolver';
import { ReservationResolver } from './api/reservation/reservation.resolver';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  providers: [RestaurantResolver, ReservationResolver],
})
export class AdapterModule {}
