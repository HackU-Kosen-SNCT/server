import { Controller, HttpCode, Post } from '@nestjs/common';
import { LinebotService } from './linebot.service';

@Controller('linebot')
export class LinebotController {
  constructor(private readonly linebotservice : LinebotService){}

  @Post('/callback')
  @HttpCode(200)
  create() :string{
    return 'This action adds a new cat';
  }
}
