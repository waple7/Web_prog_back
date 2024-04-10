import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Render } from '@nestjs/common';
@ApiTags('Support')
@Controller()
export class SupportController {
  @ApiOperation({
    summary: 'Enter message',
    description: 'Support message!',
  })
  @Get('Support')
  @Render('Support')
  showChat() {
    return;
  }
}
