import { ApiProperty } from '@nestjs/swagger';

export class Profile {
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;
}
