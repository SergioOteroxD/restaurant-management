import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  mongo_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/DBCargos',
}));
