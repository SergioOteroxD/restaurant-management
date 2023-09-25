import { registerAs } from '@nestjs/config';

export default registerAs('reservation', () => ({
  RESERVATION_ID_LENGTH: process.env.RESERVATION_ID_LENGTH || '10',
  RESERVATION_ID_PREFIX: process.env.RESERVATION_ID_PREFIX || 'RE',
}));