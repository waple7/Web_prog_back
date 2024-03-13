import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import OrderService from './order.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
@Controller('order')
export default class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Returns all orders.' })
  @Get()
  getAllOrders() {
    return this.orderService.getAllorders();
  }

  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Returns the order with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(Number(id));
  }
  // декоратор @Param('id'): Используется для извлечения id
  //  id динамическая часть маршрута, номер вакансии

  @ApiOperation({ summary: 'Create new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @Post()
  async createOrder(@Body() order: CreateOrderDto) {
    return this.orderService.createOrder(order);
  }
  // POST. Используется для отправки данных на сервер с целью создания новой сущности (в данном случае, нового поста).
  //   // Декоратор @Body(): Извлекает данные из тела запроса
  @ApiOperation({ summary: 'Delete order by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 204,
    description: 'The order has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    this.orderService.deleteOrder(Number(id));
  }
}
