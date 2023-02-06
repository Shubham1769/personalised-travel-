import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { UserLocationRepository } from '@/domain/user-location';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@/domain';
import { TripRepository } from '@/domain/trip';
import { TripModule } from '@/trip/trip.module';

@Module({
  imports: [TripModule],
  controllers: [LocationController],
  providers: [
    LocationService,
    UserLocationRepository,
    UserRepository,
    TripRepository,
  ],
})
export class LocationModule {}
