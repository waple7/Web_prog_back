import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  PipeTransform,
  Post,
  Put,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
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
import { UpdateProfileDto } from '../profile/dto/updateProfile.dto';
import { Profile } from '../profile/profile.interface';
import { Vacancy } from './vacancy.interface';
import { ProfileExceptionFilter } from '../profile/exceptionProfile/exceptions';
import { VacancyExceptionFilter } from './exceptionVacancy/exceptions';
import { IsPageNumber } from '../validator/validate';

@Controller('vacancy')
export default class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

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
  @UsePipes(ValidationPipe)
  @UseFilters(VacancyExceptionFilter)
  async getAllVacancies(
    @Query('page', new IsPageNumber()) page: number = 1, // Применяем IsPageNumber внутри Query
  ): Promise<{ vacancies: Vacancy[]; totalCount: number }> {
    return this.vacanciesService.getAllVacancies(page);
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
  @UsePipes(ValidationPipe)
  @Get(':id')
  @UseFilters(VacancyExceptionFilter)
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
  @Post(':id')
  @UsePipes(ValidationPipe)
  // @UseFilters(VacancyExceptionFilter)
  // async createVacancy(@Body() vacancy: CreateVacancyDto) {
  //   return this.vacanciesService.createVacancy(vacancy);
  // }
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
  @UsePipes(ValidationPipe)
  @UseFilters(VacancyExceptionFilter)
  async updateVacancy(
    @Param('id') id: number,
    @Body() vacancy: UpdateVacancyDto,
  ) {
    return this.vacanciesService.updateVacancy(Number(id), vacancy);
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
  @UsePipes(ValidationPipe)
  @UseFilters(VacancyExceptionFilter)
  async deleteVacancy(@Param('id') id: string) {
    this.vacanciesService.deleteVacancy(Number(id));
  }
}
