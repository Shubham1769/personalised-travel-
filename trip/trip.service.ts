import { User } from '@/domain';
import { Trip, TripRepository } from '@/domain/trip';
import { TRIP_TYPE, TRIP_TYPE_TO_BUDGET } from '@/interfaces';
import { MapquestService } from '@/mapquest/mapquest.service';
import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/createTrip.dto';

@Injectable()
export class TripService {
  constructor(
    private readonly tripRepository: TripRepository,
    private google: MapquestService,
  ) {}

  async createTrip(inputs: CreateTripDto, user?: User) {
    const trip = await this.tripRepository.save({
      source: inputs.source,
      budget: this.getBudget(inputs),
      destination: inputs.destination,
      stops:
        inputs.stops.map((item) => {
          return {
            placeId: item,
          };
        }) || [],
      user: user,
      type: inputs.type || TRIP_TYPE.FRIENDS,
    });

    return trip;
  }

  async getTrips(user?: User) {
    const trips = await this.tripRepository
      .createQueryBuilder('trip')
      .innerJoin('trip.user', 'user')
      .where('user.id = :id', { id: user.id })
      .getMany();

    return await this.formatTrip(trips);
  }

  async formatTrip(trips: Trip[]) {
    const result = [];
    for (const trip of trips) {
      const sourceResult = await this.google.client.placeDetails({
        params: {
          place_id: trip.source,
          key: this.google.config.apiKey,
        },
      });
      const source = sourceResult.data.result;

      const destinationResult = await this.google.client.placeDetails({
        params: {
          place_id: trip.destination,
          key: this.google.config.apiKey,
        },
      });
      const destination = destinationResult.data.result;

      const stops = [];

      for (const { placeId } of trip.stops) {
        const stopResult = await this.google.client.placeDetails({
          params: {
            place_id: placeId,
            key: this.google.config.apiKey,
          },
        });
        const attractions = await this.google.client.placesNearby({
          params: {
            location: stopResult.data.result.geometry.location,
            radius: 2000,
            type: this.google.config.attractions[trip.type].join(','),
            key: this.google.config.apiKey,
          },
        });

        stops.push({
          ...stopResult.data.result,
          attractions: attractions.data.results,
        });
      }

      result.push({
        id: trip.id,
        source,
        destination,
        stops,
        type: trip.type,
        budget: trip.budget,
      });
    }
    return result;
  }

  getBudget(inputs: CreateTripDto) {
    if (inputs.budget) {
      return inputs.budget;
    }
    return TRIP_TYPE_TO_BUDGET[inputs.type];
  }
}
