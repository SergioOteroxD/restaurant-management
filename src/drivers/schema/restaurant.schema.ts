import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Irestaurant } from '../../core/entity/restaurant/restaurant.entity';
import { Field, ObjectType } from '@nestjs/graphql';

export type RestaurantDocument = Restaurant & Document;

@Schema({
  timestamps: { createdAt: 'registrationDate', updatedAt: true },
  toJSON: {
    getters: true,
  },
  autoIndex: true,
})
@ObjectType()
export class Restaurant implements Irestaurant {
  @Prop({ type: String, unique: true, immutable: true })
  @Field(()=> String)
  restaurantId: string;
  
  @Prop({ type: String, index: true })
  @Field(()=> String)
  name: string;

  @Prop({ type: String })
  @Field(()=> String)
  desription: string;

  @Prop({ type: String })
  @Field(()=> String)
  city: string;

  @Prop({ type: String })
  @Field(()=> String)
  address: string;

  @Prop({ type: String })
  @Field(()=> String)
  photo: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  @Field()
  registrationDate: Date;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
