import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateReservationDto {
  @Field(() => String, { description: 'What needs to be done' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @Field(() => String, { description: 'What needs to be done' })
  @IsString()
  @MaxLength(200)
  restaurantId: string;

  @Field(() => String, { description: 'What needs to be done' })
  @IsString()
  @MaxLength(20)
  phone: string;

  @Field(() => String, { description: 'What needs to be done' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'Format yyyy-mm-dd' })
  @IsString()
  @IsDateString()
  reservationDate: any;
}
