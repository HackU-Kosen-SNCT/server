import { Controller, HttpCode, Post } from '@nestjs/common';
import { LinebotService } from './linebot.service';

@Controller('linebot')
export class LinebotController {

  @Post('/callback')
  @HttpCode(200)
  create() :string{
    return 'Test';
  }
}
