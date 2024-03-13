import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/createVacancy.dto';
import { Vacancy } from './vacancy.interface';
import { UpdateVacancyDto } from './dto/updateVacancy.dto';

@Injectable()
export default class VacanciesService {
  private lastVacancyId = 0;
  public vacancy: Vacancy[] = [];

  getAllVacancies() {
    return this.vacancy;
  }

  getVacancyById(id: number) {
    const vacancy = this.vacancy.find((vacancy) => vacancy.id === id);
    if (vacancy) {
      return vacancy;
    }
    throw new HttpException('Vacancy not found', HttpStatus.NOT_FOUND);
  }

  replaceVacancy(id: number, vacancy: UpdateVacancyDto) {
    const vacancyIndex = this.vacancy.findIndex((vacancy) => vacancy.id === id);
    if (vacancyIndex > -1) {
      this.vacancy[vacancyIndex] = vacancy;
      return vacancy;
    }
    throw new HttpException('Vacancy not found', HttpStatus.NOT_FOUND);
  }

  createVacancy(vacancy: CreateVacancyDto) {
    const newVacancy = {
      id: ++this.lastVacancyId,
      ...vacancy,
    };
    this.vacancy.push(newVacancy);
    return newVacancy;
  }

  deleteVacancy(id: number) {
    const vacancyIndex = this.vacancy.findIndex((vacancy) => vacancy.id === id);
    if (vacancyIndex > -1) {
      this.vacancy.splice(vacancyIndex, 1);
    } else {
      throw new HttpException('Vacancy not found', HttpStatus.NOT_FOUND);
    }
  }
}
