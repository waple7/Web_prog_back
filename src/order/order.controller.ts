import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import OrderService from './order.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateVacancyDto } from '../vacancies/dto/updateVacancy.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { Profile } from '../profile/profile.interface';
import { Order } from './order.interface';
import { CustomExceptionFilter } from './exceptionOrder/exceptions';
@Controller('order')
export default class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiTags('Order')
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to create an order.',
  })
  @ApiResponse({
    status: 401,
    description: 'The user is not authorized to perform this action.',
  })
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Returns all orders.' })
  @Get()
  @UsePipes(ValidationPipe)
  @UseFilters(CustomExceptionFilter)
  async getAllOrders(
    @Query('page') page: number = 1,
  ): Promise<{ orders: Order[]; totalCount: number }> {
    return this.orderService.getAllOrders(page);
  }

  @ApiTags('Order')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Returns the order with the specified ID.',
  })
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to create an order.',
  })
  @ApiResponse({
    status: 401,
    description: 'The user is not authorized to perform this action.',
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @Get(':id')
  @UsePipes(ValidationPipe)
  @UseFilters(CustomExceptionFilter)
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(Number(id));
  }
  // декоратор @Param('id'): Используется для извлечения id
  //  id динамическая часть маршрута, номер вакансии

  @ApiTags('Order')
  @ApiOperation({ summary: 'Create new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to create an order.',
  })
  @ApiResponse({
    status: 401,
    description: 'The user is not authorized to perform this action.',
  })
  @Post(':id')
  @UsePipes(ValidationPipe)
  @UseFilters(CustomExceptionFilter)
  async createOrder(@Body() order: CreateOrderDto) {
    return this.orderService.createOrder(order);
  }
  // POST. Используется для отправки данных на сервер с целью создания новой сущности (в данном случае, нового поста).
  //   // Декоратор @Body(): Извлекает данные из тела запроса
  @ApiTags('Order')
  @ApiOperation({ summary: 'Delete order by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 204,
    description: 'The order has been successfully deleted.',
  })
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to create an order.',
  })
  @ApiResponse({
    status: 401,
    description: 'The user is not authorized to perform this action.',
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @UsePipes(ValidationPipe)
  @Delete(':id')
  // @UseFilters(CustomExceptionFilter)
  // async deleteOrder(@Param('id') id: string) {
  //   this.orderService.deleteOrder(Number(id));
  // }
  @ApiTags('Order')
  @ApiOperation({ summary: 'Replace existing order' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully replaced.',
  })
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to create an order.',
  })
  @ApiResponse({
    status: 401,
    description: 'The user is not authorized to perform this action.',
  })
  @ApiResponse({ status: 404, description: 'Vacancy not found.' })
  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseFilters(CustomExceptionFilter)
  async updateOrder(@Param('id') id: number, @Body() order: UpdateOrderDto) {
    return this.orderService.updateOrder(Number(id), order);
  }
}
