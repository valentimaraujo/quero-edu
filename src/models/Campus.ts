import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Course from '@src/models/Course';
import Offer from '@src/models/Offer';

@Entity('campus')
export default class Campus {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deleted_at: Date;

  @OneToMany(() => Course, (course) => course.campus)
  @JoinColumn({ name: 'campus_id' })
  course: Course;

  @OneToMany(() => Offer, (offer) => offer.campus)
  @JoinColumn({ name: 'campus_id' })
  offer: Offer;
}
