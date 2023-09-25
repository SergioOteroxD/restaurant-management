import { registerAs } from '@nestjs/config';

export default registerAs('restaurant', () => ({
  RESTAURANT_ID_LENGTH: process.env.RESTAURANT_ID_LENGTH || '10',
  RESTAURANT_ID_PREFIX: process.env.RESTAURANT_ID_PREFIX || 'RA',
}));