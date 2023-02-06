import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserLocation } from '../user-location';

export const activeInactiveStatus = {
  ACTIVE: 'Activated',
  INACTIVE: 'Deactivated',
};
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  uuid: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  age: number;

  @Column({ default: false })
  isMarried: boolean;

  @Column({
    type: 'enum',
    enum: activeInactiveStatus,
    default: activeInactiveStatus.ACTIVE,
  })
  isActive: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserLocation, (loc) => loc.user)
  userLocation: UserLocation;
}
