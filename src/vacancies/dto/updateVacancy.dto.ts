import { ApiProperty } from "@nestjs/swagger";

export class UpdateVacancyDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  title: string;
}
