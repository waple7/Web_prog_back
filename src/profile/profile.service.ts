import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Profile } from './profile.interface';
import { CreateProfileDto } from './dto/createProfile.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { PrismaClient } from '@prisma/client';
import { Order } from '../order/order.interface';
import { CreateOrderDto } from '../order/dto/createOrder.dto';

@Injectable()
export class ProfileService {
  // private lastProfileId = 0;
  // private profile: Profile[] = [];
  constructor(private readonly prisma: PrismaClient) {}

  async getAllProfiles(
    page: number,
  ): Promise<{ profiles: Profile[]; totalCount: number }> {
    const limit = 10;
    const skip = (page - 1) * limit;
    const profiles = await this.prisma.user.findMany({ take: limit, skip });
    const totalCount = await this.prisma.user.count();
    if (!profiles || profiles.length === 0) {
      throw new NotFoundException();
    }
    return { profiles, totalCount };
  }

  async getProfileById(profileId: number): Promise<Profile | null> {
    const profile = await this.prisma.user.findUnique({
      where: { id: profileId },
    });
    if (!profile) {
      throw new NotFoundException();
    }
    return profile;
  }
  async createProfile(profileData: CreateProfileDto): Promise<Profile> {
    return this.prisma.user.create({
      data: {
        name: profileData.name,
        password: profileData.password,
        email: profileData.email,
      },
    });
  }
  async deleteProfile(profileID: number): Promise<void> {
    const profile = await this.prisma.user.findUnique({
      where: { id: profileID },
    });
    if (!profile) {
      throw new NotFoundException();
    }
    await this.prisma.user.delete({ where: { id: profileID } });
  }
  async updateProfile(
    profileID: number,
    profileData: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.prisma.user.findUnique({
      where: { id: profileID },
    });
    if (!profile) {
      throw new NotFoundException();
    }
    return this.prisma.user.update({
      where: { id: profileID },
      data: profileData,
    });
  }
  async FindUserByEmail(email: string): Promise<Profile | null> {
    return this.prisma.user.findUnique({ where: { email: email } });
  }
}
