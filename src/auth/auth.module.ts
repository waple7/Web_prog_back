import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ProfileModule } from '../profile/profile.module';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { AuthMiddleware } from './middleware';
import { JwtAuthGuard } from "../guards/jwt-guard";
@Module({
  imports: [ProfileModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('authGuard'); // Укажите путь, к которому применяется middleware

    consumer.apply(AuthMiddleware).forRoutes('login');
  }
}
