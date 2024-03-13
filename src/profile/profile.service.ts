import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from './profile.interface';

@Injectable()
export class ProfileService {
  private profiles: Profile[] = [
    {
      id: 1,
      username: 'user1',
      email: 'user1@minecraft.com',
      fullName: 'User papa',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      username: 'user2',
      email: 'user2@minecraft.com',
      fullName: 'User mama',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  getProfileById(id: number): Profile {
    const profile = this.profiles.find((profile) => profile.id === id);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }
}
