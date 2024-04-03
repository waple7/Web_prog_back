import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Order } from './order.interface';
import { PrismaClient } from '@prisma/client';
import { UpdateVacancyDto } from '../vacancies/dto/updateVacancy.dto';
import { Vacancy } from '../vacancies/vacancy.interface';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { Profile } from '../profile/profile.interface';
@Injectable()
export default class OrderService {
  // private lastOrderId = 0;
  // private order: Order[] = [];
  constructor(private readonly prisma: PrismaClient) {}
  async getAllOrders(
    page: number,
  ): Promise<{ orders: Order[]; totalCount: number }> {
    const limit = 10;
    const skip = (page - 1) * limit;
    const orders = await this.prisma.service.findMany({ take: limit, skip });
    const totalCount = await this.prisma.service.count();
    if (!orders || orders.length === 0) {
      throw new NotFoundException();
    }
    return { orders, totalCount };
  }
  async getOrderById(orderID: number): Promise<Order | null> {
    const order = await this.prisma.service.findUnique({
      where: { id: orderID },
    });
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    return this.prisma.service.create({
      data: {
        title: orderData.title,
        service: orderData.description,
        description: orderData.description,
        author: {
          connect: { id: orderData.authorId },
        },
        price: orderData.price,
      },
    });
  }
  async deleteOrder(orderID: number): Promise<void> {
    const order = await this.prisma.service.findUnique({
      where: { id: orderID },
    });
    if (!order) {
      throw new NotFoundException();
    }
    await this.prisma.service.delete({ where: { id: orderID } });
  }

  async updateOrder(
    orderId: number,
    orderData: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.prisma.vacancy.findUnique({
      where: { id: orderId },
    });
    if (!order) {
      throw new NotFoundException();
    }
    return this.prisma.service.update({
      where: { id: orderId },
      data: {
        title: orderData.title,
        service: orderData.description,
        description: orderData.description,
        author: {
          connect: { id: orderData.authorId },
        },
        price: orderData.price,
      },
    });
  }
}
