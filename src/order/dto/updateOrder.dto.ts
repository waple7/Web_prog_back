import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  service: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
// Data Transfer Objects (DTOs)
// DTOs служат для структурирования данных, которые передаются между клиентом и сервером
// DTO определяет поля и типы данных, необходимые для создания поста
