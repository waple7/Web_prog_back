import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ProfileModule } from '../profile/profile.module';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from '../strategy';
import { redirectIfNotRegistered } from './middleware';
@Module({
  imports: [ProfileModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Применяем middleware к маршруту POST /login
    consumer.apply(redirectIfNotRegistered).forRoutes('auth/login');
  }
}
