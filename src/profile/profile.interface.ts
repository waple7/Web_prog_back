import { ApiProperty } from '@nestjs/swagger';

export class Profile {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;
}
