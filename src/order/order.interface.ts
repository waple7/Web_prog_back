import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class Order {
  @ApiProperty()
  title: string;

  @ApiProperty()
  service: string;

  @ApiProperty()
  @ApiProperty()
  description: string;

  @ApiProperty()
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
