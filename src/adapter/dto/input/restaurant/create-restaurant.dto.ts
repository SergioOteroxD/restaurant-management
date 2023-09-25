import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateRestaurantDto {
  @Field(() => String, { description: 'What needs to be done' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @Field(() => String, { description: 'What needs to be done' })
  @IsString()
  @MaxLength(200)
  description: string;

  @Field(() => String, { description: 'What needs to be done' })
  @IsString()
  @MaxLength(20)
  address: string;

  @Field(() => String, { description: 'What needs to be done' })
  @IsString()
  @MaxLength(20)
  city: string;

  @Field(() => String, { description: 'What needs to be done' })
  @IsString()
  photo: string;
}
