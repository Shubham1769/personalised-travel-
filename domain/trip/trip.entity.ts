import { TripBudget, TripStop, TRIP_TYPE } from '../../interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users';

@Entity({ name: 'trip' })
export class Trip {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  uuid: string;

  @Column()
  source: string;

  @Column()
  destination: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    default: [],
  })
  stops: TripStop[];

  @Column({ type: 'jsonb', nullable: true, default: [] })
  budget: TripBudget;

  @Column({
    enum: TRIP_TYPE,
  })
  type: TRIP_TYPE;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
