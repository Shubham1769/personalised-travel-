import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Trip } from './trip.entity';

@Injectable()
export class TripRepository extends Repository<Trip> {
  constructor(private dataSource: DataSource) {
    super(Trip, dataSource.createEntityManager());
  }
  async findAll(): Promise<Trip[] | undefined> {
    return await this.createQueryBuilder().getMany();
  }
}
