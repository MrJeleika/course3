import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Campaign } from './campaign.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @ManyToOne(() => Campaign, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  campaign!: Campaign;
}
