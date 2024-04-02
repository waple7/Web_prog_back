import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class UpdateProfileDto {
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
