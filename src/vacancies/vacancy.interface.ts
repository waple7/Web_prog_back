import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class Vacancy {
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

// id         Int           @id @default(autoincrement())
// title      String
// content    String
// createdAt  DateTime      @default(now())
// author     User          @relation(fields: [vacancyId], references: [id])
// vacancyId  Int
// tagVacancy TagsVacancy[]
