import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class UpdateVacancyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
