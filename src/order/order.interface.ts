import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class Order {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  service: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
// id          Int            @id @default(autoincrement())
// title       String
// service     String
// createdAt   DateTime       @default(now())
// customer    User           @relation(fields: [serviceId], references: [id])
// serviceId      Int
// listService ListServices[]
// description String
// price Int
