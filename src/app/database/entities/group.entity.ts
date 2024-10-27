import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Student } from './student.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'group_name', type: 'varchar', length: 50, nullable: false })
  groupName!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  faculty!: string;

  @OneToMany(() => Student, (student) => student.group)
  students!: Student[];
}
