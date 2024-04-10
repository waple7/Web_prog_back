import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('header')
  @Get()
  @Render('index')
  getIndex() {
    return {
      title: 'World Nasanmi',
    };
  }
  @ApiTags('header')
  @Get('index')
  @Render('index')
  getIndexMain() {
    return {
      title: 'World Nasanmi',
    };
  }
  @ApiTags('header')
  @Get('services')
  @Render('services')
  getServices() {
    return {
      title: 'Services',
    };
  }
  @ApiTags('header')
  @Get('support')
  @Render('support')
  getSupport() {
    return {
      title: 'Support',
    };
  }
  @ApiTags('header')
  @Get('team')
  @Render('team')
  getTeam() {
    return {
      title: 'Team',
    };
  }
  @ApiTags('header')
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
