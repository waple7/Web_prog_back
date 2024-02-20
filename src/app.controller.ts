import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getIndex() {
    return {
      title: 'World Nasanmi',
    };
  }
  @Get('index')
  @Render('index')
  getIndexMain() {
    return {
      title: 'World Nasanmi',
    };
  }
  @Get('services')
  @Render('services')
  getServices() {
    return {
      title: 'Services',
    };
  }

  @Get('team')
  @Render('team')
  getTeam() {
    return {
      title: 'Team',
    };
  }
  @Get('vacancies')
  @Render('vacancies')
  getVacancies() {
    return {
      title: 'Vacancies',
    };
  }
  root() {
    return { message: 'Hello world!' };
  }
  getHello(): string {
    return this.appService.getHello();
  }
}
