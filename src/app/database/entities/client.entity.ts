import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Campaign } from './campaign.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contactEmail!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber!: string;

  @ManyToOne(() => Campaign, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  campaign!: Campaign;
}
