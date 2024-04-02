import { Module } from '@nestjs/common';
import VacanciesController from './vacancies.controller';
import VacanciesService from './vacancies.service';
import { PrismaClient } from "@prisma/client";

@Module({
  imports: [],
  controllers: [VacanciesController],
  providers: [VacanciesService, PrismaClient],
})
export class VacanciesModule {}
