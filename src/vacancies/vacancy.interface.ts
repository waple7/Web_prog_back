import { ApiProperty } from "@nestjs/swagger";

export class Vacancy {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  title: string;
}
