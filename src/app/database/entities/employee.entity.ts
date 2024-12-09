import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Department } from './department.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  position!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary!: number;

  @Column({ type: 'date', nullable: true })
  hireDate!: string;

  @ManyToOne(() => Department, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  department!: Department;
}
