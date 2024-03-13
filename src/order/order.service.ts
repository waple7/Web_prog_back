import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Order } from './order.interface';
@Injectable()
export default class OrderService {
  private lastOrderId = 0;
  private order: Order[] = [];

  getAllorders() {
    return this.order;
  }
  getOrderById(id: number) {
    const order = this.order.find((order) => order.id === id);
    if (order) {
      return order;
    }
    throw new HttpException('order not found', HttpStatus.NOT_FOUND);
  }

  createOrder(order: CreateOrderDto) {
    const newOrder = {
      id: ++this.lastOrderId,
      title: order.title,
      description: order.description,
      price: order.price,
    };
    this.order.push(newOrder);
    return newOrder;
  }

  deleteOrder(id: number) {
    const orderIndex = this.order.findIndex((order) => order.id === id);
    if (orderIndex > -1) {
      this.order.splice(orderIndex, 1);
    } else {
      throw new HttpException('order not found', HttpStatus.NOT_FOUND);
    }
  }
}
