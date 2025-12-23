import { Controller, Get, Post ,Patch, Body } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('config')
  getConfig() {
    return this.billingService.getConfig();
  }
  @Post('calculate')
  async calculate(@Body() body: { lastMonth: number; totalSoFar: number }) {
  return this.billingService.calculateBill(body.lastMonth, body.totalSoFar);
}
  @Patch('config')
  updateConfig(@Body() updateData: any) {
    // In a real app, you'd verify the admin_pin here
    return this.billingService.updateConfig(updateData);
  }
  
}