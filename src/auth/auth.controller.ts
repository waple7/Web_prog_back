import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateProfileDto } from '../profile/dto/createProfile.dto';
import { UserLoginDto } from './dto/UserLoginDto';
import { AuthUserResponse } from './response/AuthUserResponse';
import { ApiBearerAuth, ApiHeader, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from '../guards/jwt-guard';
import { TokenDto } from './dto/tokenDto';
import { AuthMiddleware } from "./middleware";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiTags('Auth')
  @ApiResponse({
    status: 201,
    description: 'registration successful .',
    // type: CreateProfileDto,
  })
  @ApiResponse({
    status: 400,
    description: 'registration not successful.',
    // type: CreateProfileDto,
  })
  @Post('register')
  register(@Body() dto: CreateProfileDto): Promise<CreateProfileDto> {
    return this.authService.registerProfile(dto);
  }

  @ApiTags('Auth')
  @ApiResponse({
    status: 200,
    description: 'login successful.',
    // type: AuthUserResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'login not successful.',
    // type: AuthUserResponse,
  })
  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Post('login')
  login(@Body() dto: UserLoginDto): Promise<AuthUserResponse> {
    return this.authService.loginProfile(dto);
  }
  // этот роут защищен гвардом который требует чтобы пользователь был
  // авторизован
  @ApiTags('Auth')
  @ApiResponse({
    status: 200,
    description: 'user is authorized',
    // type: AuthUserResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('authGuard')
  authGuard(@Body() dto: TokenDto): string {
    // В этом методе можно обрабатывать токен, который был передан в теле запроса
    return 'User is authorized';
  }
}
