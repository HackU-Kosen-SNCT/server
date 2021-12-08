import { Controller, Get } from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { ConfigService } from '@nestjs/config';
import { Client } from '@line/bot-sdk';
import { LinebotConfigService } from 'src/config/linebot-config.service';

@Controller('linebot')
export class LinebotController {
  constructor(
    readonly linebotService: LinebotService,
    private configService: ConfigService,
    private linebotConfigService: LinebotConfigService,
  ) {}

  @Get()
  // LINEプラットフォームから届くものを処理する
  // ex: 友達追加、メッセージの送信
  create() {
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    return client.replyMessage(this.configService.get<string>('LINE_USER_ID'), {
      type: 'text',
      text: 'Hello World',
    });
  }
}
