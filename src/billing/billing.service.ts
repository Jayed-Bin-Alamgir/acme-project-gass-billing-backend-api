import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingConfig } from './entities/billing-config.entity';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(BillingConfig)
    private configRepository: Repository<BillingConfig>,
  ) {}

  async getConfig() {
    const config = await this.configRepository.findOne({ where: { id: 1 } });
    if (!config) throw new NotFoundException('Configuration not found');
    return config;
  }

  async updateConfig(updateDto: any) {
    // 1. Fetch current config to get the valid PIN from DB
    const currentConfig = await this.getConfig();

    // 2. Security Check: Compare incoming PIN with DB PIN
    if (updateDto.admin_pin !== currentConfig.admin_pin) {
      throw new UnauthorizedException('Invalid Admin PIN');
    }

    // 3. Destructure to remove PIN so it's not overwritten in the DB
    // unless you specifically want to allow PIN changes
    const { admin_pin, ...dataToUpdate } = updateDto;

    // 4. Perform the update
    await this.configRepository.update(1, dataToUpdate);
    
    return this.getConfig();
  }

  // Calculation logic for the Customer Portal
// src/billing/billing.service.ts

// src/billing/billing.service.ts

async calculateBill(lastMonth: number, totalSoFar: number) {
  const config = await this.getConfig();
  const presentMonthUnits = totalSoFar - lastMonth;
  
  if (presentMonthUnits < 0) {
    throw new Error("Current reading cannot be lower than previous reading.");
  }

  const rate = Number(config.rate_per_litre);
  const vatRate = Number(config.vat_percentage) / 100;
  const serviceCharge = Number(config.service_charge);

  const subtotal = presentMonthUnits * rate;
  const vatAmount = subtotal * vatRate;
  const total = subtotal + vatAmount + serviceCharge;

  return {
    presentMonthUnits,
    rate, // <--- Add this line
    subtotal,
    vatAmount,
    serviceCharge,
    total,
    generatedAt: new Date().toLocaleString(),
  };
}
}