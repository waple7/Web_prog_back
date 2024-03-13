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

@Controller('vacancies')
export default class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Get()
  getAllVacancies() {
    return this.vacanciesService.getAllVacancies();
  }

  @Get(':id')
  getVacancyById(@Param('id') id: string) {
    return this.vacanciesService.getVacancyById(Number(id));
  }
  // декоратор @Param('id'): Используется для извлечения id
  //  id динамическая часть маршрута, номер вакансии

  @Post()
  async createVacancy(@Body() post: CreateVacancyDto) {
    return this.vacanciesService.createVacancy(post);
  }
  // POST. Используется для отправки данных на сервер с целью создания новой сущности (в данном случае, нового поста).
  //   // Декоратор @Body(): Извлекает данные из тела запроса
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
  @Delete(':id')
  async deleteVacancy(@Param('id') id: string) {
    this.vacanciesService.deleteVacancy(Number(id));
  }
}
