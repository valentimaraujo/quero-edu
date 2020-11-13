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

@Entity('universities')
export default class University {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  score: number;

  @Column()
  logo_url: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deleted_at: Date;

  @OneToMany(() => Course, (course) => course.university)
  @JoinColumn({ name: 'university_id' })
  course: Course;

  @OneToMany(() => Offer, (offer) => offer.university)
  @JoinColumn({ name: 'university_id' })
  offer: Offer;
}
