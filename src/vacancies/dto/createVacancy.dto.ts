import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVacancyDto {
  @ApiProperty()
  @IsString()
  content: string;
  @ApiProperty()
  @IsString()
  title: string;
}
// Data Transfer Objects (DTOs)
// DTOs служат для структурирования данных, которые передаются между клиентом и сервером
// DTO определяет поля и типы данных, необходимые для создания поста
