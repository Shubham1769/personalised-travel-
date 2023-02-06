import { Repository, DataSource } from 'typeorm';
import { UserLocation } from '.';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserLocationRepository extends Repository<UserLocation> {
  constructor(private dataSource: DataSource) {
    super(UserLocation, dataSource.createEntityManager());
  }
  async findAll(): Promise<UserLocation[] | undefined> {
    return await this.createQueryBuilder().getMany();
  }
}
 