import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './service/app.service';

@Controller('main')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHomepage(@Param('message') message: string) {
    return this.appService.getHomepage();
  }

  @Get(':message')
  getMessage(@Param('message') message: string): string {
    return this.appService.getMessage(message);
  }
}
