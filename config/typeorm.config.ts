/* eslint-disable prettier/prettier */
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const typeOrmAsyncConfigAdmin: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: process.env.DB_HOST || '192.168.68.192',
      port: parseInt(process.env.PORT, 10),
      username: process.env.DB_USERNAME || 'postgres',
      database: process.env.DB_NAME || 'code_night',
      password: process.env.DB_PASSWORD || 'password',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      // cli: {
      //   migrationsDir: __dirname + '/../database/migrations',
      // },
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: false,
      logging: false,
      schema: 'public',
    };
  },
};

export const typeOrmConfigAdmin: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || '192.168.68.192',
  port: parseInt(process.env.PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  database: process.env.DB_NAME || 'code_night',
  password: process.env.DB_PASSWORD || 'password',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: __dirname + '/../database/migrations',
  // },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: false,
};
