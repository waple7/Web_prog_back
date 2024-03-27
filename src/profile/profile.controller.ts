import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProfileDto } from './dto/createProfile.dto';
import { UpdateVacancyDto } from '../vacancies/dto/updateVacancy.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Controller('/profile')
export default class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @ApiTags('Profile')
  @ApiResponse({
    status: 401,
    description: 'The user is not authorized to perform this action.',
  })
  @ApiOperation({ summary: 'Get all profiles' })
  @ApiResponse({ status: 200, description: 'Returns all profiles.' })
  @Get()
  @UsePipes(ValidationPipe)
  getAllProfiles() {
    return this.profileService.getAllProfiles();
  }
  @ApiTags('Profile')
  @ApiOperation({ summary: 'Get profile by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the profile',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the profile with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Profile not found.' })
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to create an order.',
  })
  @ApiResponse({
    status: 401,
    description: 'The user is not authorized to perform this action.',
  })
  @UsePipes(ValidationPipe)
  @Get(':id')
  getProfileById(@Param('id') id: number) {
    return this.profileService.getProfileById(Number(id));
  }

  @ApiTags('Profile')
  @ApiOperation({ summary: 'Create new profile' })
  @ApiResponse({
    status: 201,
    description: 'The profile has been successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to create an profile.',
  })
  @Post(':id')
  @UsePipes(ValidationPipe)
  @ApiBody({
    type: CreateProfileDto,
    schema: {
      example: {
        username: 'john_doe',
        password: 'password123',
        email: 'john@example.com',
        // Другие поля вашего DTO
      },
    },
  })
  async createProfile(@Body() profile: CreateProfileDto) {
    return this.profileService.createProfile(profile);
  }

  @ApiTags('Profile')
  @ApiOperation({ summary: 'Delete profile by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 204,
    description: 'The profile has been successfully deleted.',
  })
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to create an order.',
  })
  @ApiResponse({
    status: 401,
    description: 'The user is not authorized to perform this action.',
  })
  @ApiResponse({ status: 404, description: 'profile not found.' })
  @UsePipes(ValidationPipe)
  @Delete(':id')
  async deleteProfile(@Param('id') id: string) {
    this.profileService.deleteProfile(Number(id));
  }

  @ApiTags('Profile')
  @ApiOperation({ summary: 'Update existing profile' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The profile has been successfully updated.',
  })
  @ApiResponse({
    status: 401,
    description: 'The user is not authorized to perform this action.',
  })
  @ApiResponse({ status: 404, description: 'Profile not found.' })
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateProfile(@Param('id') id: number, @Body() post: UpdateProfileDto) {
    return this.profileService.updateProfile(Number(id), post);
  }
}
