import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import VacanciesService from './vacancies.service';
import { CreateVacancyDto } from './dto/createVacancy.dto';
import { UpdateVacancyDto } from './dto/updateVacancy.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('vacancies')
export default class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @ApiBody({ type: [VacanciesService] })
  @ApiTags('Vacancies')
  @ApiOperation({ summary: 'Get all vacancies' })
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to create an order.',
  })
  @ApiResponse({
    status: 401,
    description: 'The user is not authorized to perform this action.',
  })
  @ApiResponse({ status: 200, description: 'Returns all vacancies.' })
  @Get()
  getAllVacancies() {
    return this.vacanciesService.getAllVacancies();
  }

  @ApiTags('Vacancies')
  @ApiOperation({ summary: 'Get vacancy by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns the vacancy with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Vacancy not found.' })
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to create an order.',
  })
  @ApiResponse({
    status: 401,
    description: 'The user is not authorized to perform this action.',
  })
  @Get(':id')
  getVacancyById(@Param('id') id: string) {
    return this.vacanciesService.getVacancyById(Number(id));
  }
  // декоратор @Param('id'): Используется для извлечения id
  //  id динамическая часть маршрута, номер вакансии

  @ApiTags('Vacancies')
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to create an order.',
  })
  @ApiResponse({
    status: 401,
    description: 'The user is not authorized to perform this action.',
  })
  @ApiOperation({ summary: 'Create new vacancy' })
  @ApiResponse({
    status: 201,
    description: 'The vacancy has been successfully created.',
  })
  @Post()
  @ApiParam({ name: 'id', type: 'number' })
  async createVacancy(@Body() post: CreateVacancyDto) {
    return this.vacanciesService.createVacancy(post);
  }
  // POST. Используется для отправки данных на сервер с целью создания новой сущности (в данном случае, нового поста).
  //   // Декоратор @Body(): Извлекает данные из тела запроса
  @ApiTags('Vacancies')
  @ApiOperation({ summary: 'Replace existing vacancy' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The vacancy has been successfully replaced.',
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
  async replaceVacancy(
    @Param('id') id: string,
    @Body() post: UpdateVacancyDto,
  ) {
    return this.vacanciesService.replaceVacancy(Number(id), post);
  }
  // замена (обновление) существующего поста в системе
  // @Body() используется для извлечения тела запроса
  // @Param() используется для извлечения параметра маршрута
  @ApiTags('Vacancies')
  @ApiOperation({ summary: 'Delete vacancy by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to create an order.',
  })
  @ApiResponse({
    status: 401,
    description: 'The user is not authorized to perform this action.',
  })
  @ApiResponse({
    status: 204,
    description: 'The vacancy has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Vacancy not found.' })
  @Delete(':id')
  async deleteVacancy(@Param('id') id: string) {
    this.vacanciesService.deleteVacancy(Number(id));
  }
}
