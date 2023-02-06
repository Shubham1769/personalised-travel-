import { BoatModule } from '@/boat';
import { MapquestModule } from '@/mapquest/mapquest.module';
import { LocationModule } from '@/location/location.module';
import { TripModule } from '@/trip/trip.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfigAdmin } from '../config/typeorm.config';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    BoatModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfigAdmin),
    UsersModule,
    JwtModule,
    MapquestModule,
    LocationModule,
    TripModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
