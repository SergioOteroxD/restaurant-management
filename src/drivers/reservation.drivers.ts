import { Injectable, Logger } from '@nestjs/common';
import { Model, ProjectionType, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Reservation, ReservationDocument } from './schema';
import { GeneralUtils } from '../commons/util/general.util';
import { Ireservation } from '../core/entity/reservation/reservation.interface';
import { CustomException } from '../core/entity/common/custom-exception.model';

@Injectable()
export class ReservationDriver {
  constructor(
    @InjectModel(Reservation.name)
    private userDocument: Model<ReservationDocument>,
    private configService: ConfigService,
  ) {}

  async register(userData: Partial<Ireservation>): Promise<Ireservation> {
    try {
      
      const ID_LENGTH = this.configService.get('reservation.RESERVATION_ID_LENGTH');
      const ID_PREFIX = this.configService.get<string>('reservation.RESERVATION_ID_PREFIX');
      const reservationId = GeneralUtils.generateId(ID_LENGTH, ID_PREFIX);

      const data = {
        reservationId,
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
    projection: ProjectionType<ReservationDocument> = {},
    sort: any = { _id: -1 },
  ): Promise<any[]> {
    return this.userDocument
      .find(filter, projection)
      .skip(limit * (page - 1))
      .sort(sort)
      .limit(limit);
  }

  async update(reservationId: string, data: UpdateQuery<ReservationDocument>): Promise<Ireservation> {
    try {
      return await this.userDocument.findByIdAndUpdate({ reservationId }, data);
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

  async getById(reservationId: string, projection?: ProjectionType<ReservationDocument>): Promise<Ireservation> {
    return this.userDocument.findOne({ reservationId }, projection);
  }

  async getRestaurant(filter: any, projection?: ProjectionType<ReservationDocument>): Promise<Ireservation[]> {
    return this.userDocument.find(filter, projection);
  }

  async report(filter: any, sort?: any): Promise<any> {
    return this.userDocument.aggregate(filter);
  }
}
