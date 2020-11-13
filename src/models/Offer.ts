import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Course from '@src/models/Course';
import University from '@src/models/University';
import Campus from '@src/models/Campus';

@Entity('offers')
export default class Offer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  full_price: number;

  @Column()
  price_with_discount: number;

  @Column()
  discount_percentage: number;

  @Column()
  enrollment_semester: number;

  @Column()
  enabled: boolean;

  @Column({ type: 'datetime' })
  start_date: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deleted_at: Date;

  @ManyToOne(() => Course, (course) => course.offer)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => University, (university) => university.offer)
  @JoinColumn({ name: 'university_id' })
  university: University;

  @ManyToOne(() => Campus, (campus) => campus.offer)
  @JoinColumn({ name: 'campus_id' })
  campus: Campus;
}
