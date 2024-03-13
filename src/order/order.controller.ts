import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import OrderService from './order.service';
@Controller('order')
export default class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  getAllOrders() {
    return this.orderService.getAllorders();
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(Number(id));
  }
  // декоратор @Param('id'): Используется для извлечения id
  //  id динамическая часть маршрута, номер вакансии

  @Post()
  async createOrder(@Body() order: CreateOrderDto) {
    return this.orderService.createOrder(order);
  }
  // POST. Используется для отправки данных на сервер с целью создания новой сущности (в данном случае, нового поста).
  //   // Декоратор @Body(): Извлекает данные из тела запроса
  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    this.orderService.deleteOrder(Number(id));
  }
}
