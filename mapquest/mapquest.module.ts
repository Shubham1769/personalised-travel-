import { Module } from '@nestjs/common';
import { MapquestService } from './mapquest.service';
import { MapquestController } from './mapquest.controller';
import { BoatModule } from '@/boat';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [BoatModule],
  providers: [MapquestService, HttpModule],
  exports: [MapquestService],
  controllers: [MapquestController],
})
export class MapquestModule {}
