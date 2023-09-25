import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IqueryRestaurantFilter } from '../../../../core/entity/restaurant/query-restaurant-filter.entity';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

@InputType()
export class FilterRestaurantArg implements IqueryRestaurantFilter {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  city: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @Length(1, 1)
  firtCharCity: string;
}
