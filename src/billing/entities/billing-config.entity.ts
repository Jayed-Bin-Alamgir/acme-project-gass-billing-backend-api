import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('billing_config')
export class BillingConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  rate_per_litre: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  vat_percentage: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  service_charge: number;

  @Column()
  admin_pin: string;

  @UpdateDateColumn()
  updated_at: Date;
}