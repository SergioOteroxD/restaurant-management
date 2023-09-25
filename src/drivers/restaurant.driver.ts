import { Injectable, Logger } from '@nestjs/common';
import { Model, ProjectionType, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Restaurant, RestaurantDocument } from './schema';
import { Irestaurant } from '../core/entity/restaurant/restaurant.entity';
import { GeneralUtils } from '../commons/util/general.util';
import { CustomException } from 'src/core/entity/common';

@Injectable()
export class RestaurantDriver {
  constructor(
    @InjectModel(Restaurant.name)
    private userDocument: Model<RestaurantDocument>,
    private configService: ConfigService,
  ) {}

  async register(userData: Partial<Irestaurant>): Promise<Irestaurant> {
    try {
      
      const ID_LENGTH = this.configService.get('restaurant.RESTAURANT_ID_LENGTH');
      const ID_PREFIX = this.configService.get<string>('restaurant.RESTAURANT_ID_PREFIX');
      const restaurantId = GeneralUtils.generateId(ID_LENGTH, ID_PREFIX);

      const data = {
        restaurantId,
        ...userData,
      };

      return await this.userDocument.create(data);
    } catch (error) {
      Logger.log('ERROR', error?.message, 'RestaurantDriver.register', {
        data: error,
        type: 'EXCEPTION',
        tags: 'MONGO_DB',
      });
      throw new CustomException({ code: 'TECH001', message: error?.message }, 'RestaurantDriver.register', error);
    }
  }

  async getTotal(filter: any): Promise<number> {
    return this.userDocument.countDocuments(filter);
  }

  async getAll(
    page: number,
    limit: number,
    filter: any,
    projection: ProjectionType<RestaurantDocument> = {},
    sort: any = { _id: -1 },
  ): Promise<any[]> {
    return this.userDocument
      .find(filter, projection)
      .skip(limit * (page - 1))
      .sort(sort)
      .limit(limit);
  }

  async update(adminId: string, data: UpdateQuery<RestaurantDocument>): Promise<Irestaurant> {
    try {
      return await this.userDocument.findOneAndUpdate({ adminId }, data);
    } catch (error) {
      Logger.log('ERROR', error?.message, 'RestaurantDriver.update', {
        data: error,
        type: 'EXCEPTION',
        tags: 'MONGO_DB',
      });
      throw new CustomException(
        { code: 'TECH002', message: error?.message },
        'RestaurantDriver.update',
        'Technical',
        error,
      );
    }
  }

  async getById(restaurantId: string, projection?: ProjectionType<RestaurantDocument>): Promise<Irestaurant> {
    return this.userDocument.findOne({ restaurantId }, projection);
  }

  async getRestaurant(filter: any, projection?: ProjectionType<RestaurantDocument>): Promise<Irestaurant[]> {
    return this.userDocument.find(filter, projection);
  }

  async report(filter: any, sort?: any): Promise<any> {
    return this.userDocument.aggregate(filter);
  }
}
