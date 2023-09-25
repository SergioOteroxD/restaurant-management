import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Ireservation } from '../../core/entity/reservation/reservation.interface';
import { Field, ObjectType } from '@nestjs/graphql';

export type ReservationDocument = Reservation & Document;

@Schema({
  timestamps: { createdAt: 'registrationDate', updatedAt: true },
  toJSON: {
    getters: true,
  },
  autoIndex: true,
})
@ObjectType()
export class Reservation implements Ireservation {
  @Prop({ type: String, unique: true, immutable: true })
  @Field(()=> String)
  reservationId: string;

  @Prop({ type: String, index: true })
  @Field(()=> String)
  name: string;

  @Prop({ type: String })
  @Field(()=> String)
  email: string;

  @Prop({ type: String })
  @Field(()=> String)
  phone: string;

  @Prop({ type: String })
  @Field(()=> String)
  restaurantId: string;

  
  @Prop({
    type: Date,
    default: Date.now,
  })
  @Field()
  reservationDate: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  @Field()
  registrationDate: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
