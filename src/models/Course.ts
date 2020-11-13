import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import University from '@src/models/University';
import Campus from '@src/models/Campus';
import Offer from '@src/models/Offer';

export enum Kind {
  PRESENTIAL = 'Presencial',
  EAD = 'EaD',
}

export enum Level {
  BACHELOR_DEGREE = 'Bacharelado',
  TECHNOLOGIST = 'Tecnólogo',
  GRADUATION = 'Licenciatura',
}

export enum Shift {
  MORNING = 'Manhã',
  EVENING = 'Tarde',
  NIGHT = 'Noite',
  VIRTUAL = 'Virtual',
}

@Entity('courses')
export default class Course {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column('text')
  kind: Kind;

  @Column('text')
  level: Level;

  @Column('text')
  shift: Shift;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deleted_at: Date;

  @ManyToOne(() => University, (university) => university.course)
  @JoinColumn({ name: 'university_id' })
  university: University;

  @ManyToOne(() => Campus, (campus) => campus.course)
  @JoinColumn({ name: 'campus_id' })
  campus: Campus;

  @OneToMany(() => Offer, (offer) => offer.course)
  @JoinColumn({ name: 'course_id' })
  offer: Offer;
}
