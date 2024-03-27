import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsInt()
  id: number;
  @ApiProperty()
  @IsString()
  username: string;
  @IsString()
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsEmail()
  email: string;
}
