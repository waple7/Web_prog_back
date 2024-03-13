import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@Controller('profile')
export default class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @ApiOperation({ summary: 'Get profile by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'The ID of the profile' })
  @ApiResponse({ status: 200, description: 'Returns the profile with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Profile not found.' })
  @Get(':id')
  getProfileById(@Param('id') id: number) {
    return this.profileService.getProfileById(Number(id));
  }
}
