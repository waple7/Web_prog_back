import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateVacancyDto } from './dto/createVacancy.dto';
import { Vacancy } from './vacancy.interface';
import { UpdateVacancyDto } from './dto/updateVacancy.dto';
import { PrismaClient } from "@prisma/client";
import { Profile } from "../profile/profile.interface";
import { CreateProfileDto } from "../profile/dto/createProfile.dto";
import { UpdateProfileDto } from "../profile/dto/updateProfile.dto";

@Injectable()
export default class VacanciesService {
  constructor(private readonly prisma: PrismaClient) {
  }

  async getAllVacancies(): Promise<Vacancy[]> {
    const vacancies = await this.prisma.vacancy.findMany();
    if (!vacancies || vacancies.length === 0) {
      throw new NotFoundException();
    }
    return vacancies;
  }

  async getVacancyById(vacancyId: number): Promise<Vacancy | null> {
    const vacancy = await this.prisma.vacancy.findUnique({
      where: { id: vacancyId },
    });
    if (!vacancy) {
      throw new NotFoundException();
    }
    return vacancy;
  }

  async createVacancy(vacancyData: CreateVacancyDto): Promise<Vacancy> {
    return this.prisma.vacancy.create({
      data: {
        content: vacancyData.content,
        title: vacancyData.title,
        author: {
          connect: { id: vacancyData.authorId },
        },
      },
    });
  }

  async deleteVacancy(vacancyID: number): Promise<void> {
    const vacancy = await this.prisma.vacancy.findUnique({
      where: { id: vacancyID },
    });
    if (!vacancy) {
      throw new NotFoundException();
    }
    await this.prisma.vacancy.delete({ where: { id: vacancyID } });
  }

  async updateVacancy(
    vacancyId: number,
    vacancyData: UpdateVacancyDto,
  ): Promise<Vacancy> {
    const vacancy = await this.prisma.vacancy.findUnique({
      where: { id: vacancyId },
    });
    if (!vacancy) {
      throw new NotFoundException();
    }
    return this.prisma.vacancy.update({
      where: { id: vacancyId },
      data: {
        content: vacancyData.content,
        title: vacancyData.title,
        author: { connect: { id: vacancyData.authorId } }, // Устанавливаем связь с пользователем (автором)
      },
    });
  }
}
