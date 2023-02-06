import { Global, Module } from '@nestjs/common';
import config from '@/config';
import { ConfigModule } from '@nestjs/config';
import { DiscoveryModule } from '@nestjs/core';
import { BaseValidator } from './validator';
import { AppConfig } from './utils/appConfig';

@Global()
@Module({
  imports: [
    DiscoveryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: config,
    }),
  ],
  providers: [BaseValidator, AppConfig],
  exports: [BaseValidator],
})
export class BoatModule {}
