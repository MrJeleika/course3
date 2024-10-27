import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('exam_commissions')
export class ExamCommission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'chairman_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  chairmanName!: string;

  @Column({
    name: 'secretary_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  secretaryName!: string;

  @Column({ name: 'member_names', type: 'jsonb', nullable: true })
  memberNames!: object; // Use an array if a fixed structure is expected, e.g., string[]
}
