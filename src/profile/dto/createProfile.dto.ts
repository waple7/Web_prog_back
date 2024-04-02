import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';
export class CreateProfileDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsString()
  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
// Data Transfer Objects (DTOs)
// DTOs служат для структурирования данных, которые передаются между клиентом и сервером
// DTO определяет поля и типы данных, необходимые для создания поста
