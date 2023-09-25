import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { IqueryReservationFilter } from '../../../../core/entity/reservation/query-reservation-filter.entity';

@InputType()
export class FilterReservationArg implements IqueryReservationFilter {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  email: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  restaurantId: string;
}
