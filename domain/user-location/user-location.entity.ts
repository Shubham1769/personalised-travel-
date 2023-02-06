import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Point } from 'geojson';
import { User } from '../users';

@Entity({ name: 'user_location' })
export class UserLocation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  uuid: string;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
