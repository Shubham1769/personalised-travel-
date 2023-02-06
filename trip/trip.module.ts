import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TripRepository } from '@/domain/trip';
import { MapquestModule } from '@/mapquest/mapquest.module';

@Module({
  imports: [MapquestModule],
  controllers: [TripController],
  providers: [TripService, TripRepository],
  exports: [TripService],
})
export class TripModule {}
