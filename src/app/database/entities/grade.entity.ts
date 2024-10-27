import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Exam } from './exam.entity';
import { Student } from './student.entity';

@Entity('grades')
export class Grade {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Student, { nullable: true, onDelete: 'CASCADE' })
  student!: Student;

  @ManyToOne(() => Exam, { nullable: false, onDelete: 'CASCADE' })
  exam!: Exam;

  @Column({ type: 'decimal', precision: 5, scale: 1, nullable: true })
  grade!: number;

  @Column({ name: 'date_awarded', type: 'date', nullable: true })
  dateAwarded!: string;
}
