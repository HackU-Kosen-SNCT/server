import { Body, Controller, Post } from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { ConfigService } from '@nestjs/config';
import { Client, TextEventMessage } from '@line/bot-sdk';
import { LinebotConfigService } from 'src/config/linebot-config.service';

@Controller('linebot')
export class LinebotController {
  constructor(
    readonly linebotService: LinebotService,
    private configService: ConfigService,
    private linebotConfigService: LinebotConfigService,
  ) {}

  @Post('/laf')
  // LINEプラットフォームから届くものを処理する
  // ex: 友達追加、メッセージの送信
  create(@Body() destination: string, @Body() events: TextEventMessage[]) {
    console.log(destination);
    console.log(events);
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    return client.pushMessage(
      this.configService.get<string>('LINE_USER_ID'),
      this.linebotService.carouselMessage(),
    );
  }
}
