import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, QueryBuilder, Repository } from 'typeorm';
import { Geometry, Point } from 'geojson';
import { UserLocation, UserLocationRepository } from '@/domain/user-location';
import { UserLocationDto } from './dto/user-location.dto';
import { User, UserRepository } from '@/domain';
import { TripRepository } from '@/domain/trip';
import { TripService } from '@/trip/trip.service';
@Injectable()
export class LocationService {
  constructor(
    private readonly repo: UserLocationRepository,
    private readonly userRepo: UserRepository,
    private readonly tripRepo: TripRepository,
    private readonly tripService: TripService,
  ) {}

  public async getAll() {
    return await this.repo.find();
  }

  public async create(location: UserLocationDto, userUUID: string) {
    const user = await this.userRepo.findOne({ where: { uuid: userUUID } });
    const pointObject: Point = {
      type: 'Point',
      coordinates: [location.lat, location.lat],
    };
    return await this.repo.save({
      location: pointObject,
      user,
    });
  }

  public async getNearbyUsers(user?: User, distance = 5000) {
    const location = await this.repo
      .createQueryBuilder('location')
      .innerJoin('location.user', 'user')
      .where('user.id = :id', { id: user.id })
      .orderBy('location.createdAt', 'DESC')
      .getOne();
    if (!location) {
      return [];
    }

    const qb = this.repo
      .createQueryBuilder('location')
      .select('location')
      .where(
        `ST_Distance(location.location, ST_GeomFromGeoJSON(:location)) < :distance`,
        {
          location: JSON.stringify(location.location),
          distance,
        },
      )
      .innerJoinAndSelect('location.user', 'user')
      .andWhere('user.id != :id', { id: user.id });

    const users = await qb.getMany();

    const userIds = users.map((user) => user.user.id);

    const trips = await this.tripRepo
      .createQueryBuilder('trip')
      .where('trip.userId IN (:...userIds)', { userIds })
      .getMany();

    const returnTrips = await this.tripService.formatTrip(trips);

    return returnTrips;
  }
}
