import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('profile')
export default class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
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
  @Get(':id')
  getProfileById(@Param('id') id: number) {
    return this.profileService.getProfileById(Number(id));
  }
}
