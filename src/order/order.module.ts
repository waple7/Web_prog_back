import { Module } from '@nestjs/common';
import OrderController from './order.controller';
import OrderService from './order.service';
import { PrismaService } from '../prisma.service';
import { DatabaseModule } from '../database.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaClient],
})
export class OrderModule {}
