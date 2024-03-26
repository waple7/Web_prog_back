import {
  HttpException, HttpStatus,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { Profile } from './profile.interface';
import { CreateProfileDto } from './dto/createProfile.dto';

@Injectable()
export class ProfileService {
  private lastProfileId = 0;
  private profile: Profile[] = [];
  // private profiles: Profile[] = [
  //   {
  //     id: 1,
  //     username: 'user1',
  //     email: 'user1@minecraft.com',
  //     fullName: 'User biba',
  //     createdAt: new Date(),
  //   },
  //   {
  //     id: 2,
  //     username: 'user2',
  //     email: 'user2@minecraft.com',
  //     fullName: 'User boba',
  //     createdAt: new Date(),
  //   },
  // ];
  getAllProfiles() {
    return this.profile;
  }
  getProfileById(id: number): Profile {
    const profile = this.profile.find((profile) => profile.id === id);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  createProfile(profile: CreateProfileDto) {
    const newProfile = {
      id: ++this.lastProfileId,
      username: profile.username,
      password: profile.password,
      description: profile.description,
      email: profile.email,
    };
    this.profile.push(newProfile);
    return newProfile;
  }

  deleteProfile(id: number) {
    const profileIndex = this.profile.findIndex((profile) => profile.id === id);
    if (profileIndex > -1) {
      this.profile.splice(profileIndex, 1);
    } else {
      throw new HttpException('profile not found', HttpStatus.NOT_FOUND);
    }
  }
}
