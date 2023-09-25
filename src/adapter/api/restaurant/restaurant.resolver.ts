import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { Restaurant } from 'src/drivers/schema';
import { CreateRestaurantDto } from '../../dto/input/restaurant/create-restaurant.dto';
import { CreateRestaurant, QueryRestaurant } from '../../../core/use_case';
import { ResponseHttp } from '../../../core/entity/common/response-http.model';
import { FilterRestaurantArg } from '../../dto/arg/restaurant/filter-restaurant.arg';
import { RestaurantQuery } from '../../../core/entity/common/response-base.model';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(
    private createRestaurant: CreateRestaurant,
    private queryRestaurant: QueryRestaurant,
  ) {}
  @Mutation(() => ResponseHttp)
  async createRestaurantR(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantDto,
  ) {
    const result = await this.createRestaurant.create(createRestaurantInput);
    return new ResponseHttp(result.status, result);
  }

  @Query(() => [Restaurant])
  getAllRestaurant(
    @Args('limit', { type: () => Int, nullable: true }) limit: number = 25,
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
    @Args('filter', { nullable: true })
    filterArg: FilterRestaurantArg,
  ) {
    return this.queryRestaurant.getAll(page, limit, filterArg);
  }

  @Query(() => Restaurant)
  getOneRestaurant(@Args('restaurantId', { type: () => String }) id: string) {
    return this.queryRestaurant.getById(id);
  }
}
