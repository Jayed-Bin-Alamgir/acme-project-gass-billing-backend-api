import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { BillingConfig } from './entities/billing-config.entity'; // Make sure this path is correct

@Module({
  // This line is what allows BillingService to use the Database Repository
  imports: [TypeOrmModule.forFeature([BillingConfig])], 
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}