import { Controller, HttpCode, Post, Get } from '@nestjs/common';
import { LinebotService } from './linebot.service';

@Controller('linebot')
export class LinebotController {
  constructor(readonly linebotservice: LinebotService) {}

  @Post()
  @HttpCode(200)
  create(): string {
    return 'Test';
  }
}
