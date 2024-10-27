import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Subject } from './subject.entity';

@Entity('exams')
export class Exam {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Subject, { nullable: false, onDelete: 'CASCADE' })
  subject!: Subject;

  @Column({ type: 'date', nullable: false })
  date!: string;

  @Column({ type: 'time', nullable: true })
  time!: string;
}
