import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Employee } from './employee.entity';

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'date', nullable: true })
  startDate!: string;

  @Column({ type: 'date', nullable: true })
  endDate!: string;

  @ManyToOne(() => Employee, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  manager!: Employee;
}
