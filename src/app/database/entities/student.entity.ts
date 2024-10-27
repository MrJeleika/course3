import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Group } from './group.entity';
import { Grade } from './grade.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'full_name', type: 'varchar', length: 255, nullable: false })
  fullName!: string;

  @ManyToOne(() => Group, (group) => group.students, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  group!: Group;

  @OneToMany(() => Grade, (grade) => grade.student)
  grades!: Grade[];
}
