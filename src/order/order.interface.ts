import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;
}
