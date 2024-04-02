import { Module } from '@nestjs/common';
import ProfileController from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [ProfileService, PrismaClient],
})
export class ProfileModule {}
