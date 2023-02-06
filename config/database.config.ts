import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || '192.168.68.192',
  port: process.env.DB_PORT || 5433,
  username: process.env.DB_USERNAME || 'code_night',
  password: process.env.DB_PASSWORD || 'password',
  name: process.env.DB_NAME || 'test',
  synchronize: false,
}));
