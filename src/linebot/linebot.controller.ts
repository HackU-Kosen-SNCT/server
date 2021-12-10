import { Body, Controller, Post } from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { ConfigService } from '@nestjs/config';
import { WebhookEvent, WebhookRequestBody } from '@line/bot-sdk';
import { LinebotConfigService } from 'src/config/linebot-config.service';
import { UserService } from 'src/user/user.service';

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
          this.userService.registerUser(event.source.userId);
          break;
        default:
          break;
      }
    });
    // const client = new Client(this.linebotConfigService.createLinebotOptions());
    // return client.pushMessage(
    //   this.configService.get<string>('LINE_USER_ID'),
    //   this.linebotService.carouselMessage(),
    // );
  }
}
