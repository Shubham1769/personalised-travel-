import { Repository, DataSource } from 'typeorm';
import { User } from '.';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async findAll(): Promise<User[] | undefined> {
    return await this.createQueryBuilder().getMany();
  }
}
