import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { CreateProfileDto } from '../profile/dto/createProfile.dto';
import { UserLoginDto } from './dto/UserLoginDto';
import * as bcrypt from 'bcrypt';
import { AppError } from '../constants/errors';
import { AuthUserResponse } from './response/AuthUserResponse';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly profileService: ProfileService,
    private readonly tokenService: TokenService,
  ) {}
  async registerProfile(dto: CreateProfileDto): Promise<CreateProfileDto> {
    const existProfile = await this.profileService.FindUserByEmail(dto.email);
    if (existProfile) {
      throw new BadRequestException(AppError.USER_EXIST);
    }

    // Хешируем пароль перед сохранением
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Заменяем исходный пароль на хеш в DTO
    const dtoWithHashedPassword = { ...dto, password: hashedPassword };

    // Создаем профиль с хешированным паролем
    return this.profileService.createProfile(dtoWithHashedPassword);
  }

  async loginProfile(dto: UserLoginDto): Promise<AuthUserResponse> {
    const existProfile = await this.profileService.FindUserByEmail(dto.email);
    if (!existProfile) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(
      dto.password,
      existProfile.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    const token = await this.tokenService.generateJwtToken(dto.email);
    return { ...existProfile, token };
  }

  // async FindUserByEmail(userEmail: string): Promise<any> {
  //   const user = await this.profileService.FindUserByEmail(userEmail);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return user;
  // }
}
