import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { VacanciesModule } from './vacancies/vacancies.module';
import { ProfileModule } from './profile/profile.module';
import { OrderModule } from './order/order.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeInterceptor } from './timing.interceptor';
import { PrismaService } from './prisma.service';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { SupportGateway } from './support/support.gateway';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot(),
    VacanciesModule,
    OrderModule,
    ProfileModule,
    DatabaseModule,
    AuthModule,
    TokenModule,
    SupportGateway,
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeInterceptor,
    },
  ],
})
export class AppModule {}