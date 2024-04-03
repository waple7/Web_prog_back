import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Profile {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
}
