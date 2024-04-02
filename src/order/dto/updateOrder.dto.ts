import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class UpdateOrderDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  service: string;

  @ApiProperty()
  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
// Data Transfer Objects (DTOs)
// DTOs служат для структурирования данных, которые передаются между клиентом и сервером
// DTO определяет поля и типы данных, необходимые для создания поста
