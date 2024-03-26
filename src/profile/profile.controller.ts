import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProfileService } from './profile.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from './dto/createProfile.dto';

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
  @ApiParam({ name: 'id', type: 'string' })
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
  async createOrder(@Body() profile: CreateProfileDto) {
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
  async deleteOrder(@Param('id') id: string) {
    this.profileService.deleteProfile(Number(id));
  }
}
