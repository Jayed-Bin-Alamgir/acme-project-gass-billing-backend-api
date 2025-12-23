import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // The tool that talks to Database
import { BillingModule } from './billing/billing.module'; // Your billing feature

import * as dotenv from 'dotenv'; // Tool to read your .env file

// This line tells NestJS to look at your .env file and find DATABASE_URL
dotenv.config();

@Module({
  imports: [
    // 1. Setup the Database Connection
    TypeOrmModule.forRoot({
      type: 'postgres',           // Supabase uses PostgreSQL
      url: process.env.DATABASE_URL, // Uses the URL you put in your .env file
      autoLoadEntities: true,     // Automatically finds your "BillingConfig" entity
      synchronize: false,         // 'false' because we already created the table manually in SQL Editor
    }),
    
    // 2. Register your Billing feature
    BillingModule,
  ],
})
export class AppModule {}