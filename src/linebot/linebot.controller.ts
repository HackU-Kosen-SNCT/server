import { Body, Controller, Post } from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { ConfigService } from '@nestjs/config';
import { WebhookEvent, WebhookRequestBody } from '@line/bot-sdk';
import { LinebotConfigService } from 'src/config/linebot-config.service';
import { UserService } from 'src/user/user.service';
import * as crypto from 'crypto';

@Controller('linebot')
export class LinebotController {
  constructor(
    readonly linebotService: LinebotService,
    private configService: ConfigService,
    private linebotConfigService: LinebotConfigService,
    private userService: UserService,
  ) {}

  @Post()
  // LINEプラットフォームから届くものを処理する
  // ex: 友達追加、メッセージの送信
  async handler(@Body() req: WebhookRequestBody) {
    const events: WebhookEvent[] = req.events;
    events.map((event) => {
      switch (event.type) {
        case 'follow':
          // 友達追加時のイベント
          // userテーブルへの追加処理を生やす
          // リッチメニューの設定
          this.userService.registerUser(event.source.userId);
          this.linebotService.SettingRichMenu();
          break;
        case 'postback':
          this.linebotService.postBackHandler(event);
          break;
        default:
          break;
      }
    });
  }

  @Post('/flex')
  sendFlex(): any {
    return this.linebotService.sendFlexMessage_test();
  }

  @Post('/test')
  getEvent(@Body() body: any) {
    console.log(body);
    return this.linebotService.SettingRichMenu();
  }
}
