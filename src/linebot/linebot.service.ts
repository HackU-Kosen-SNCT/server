import { Injectable } from '@nestjs/common';
import '@line/bot-sdk';
import { Client } from '@line/bot-sdk';
import { LinebotConfigService } from 'src/config/linebot-config.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class LinebotService {
  constructor(
    private configService: ConfigService,
    private linebotConfigService: LinebotConfigService,
  ) {}

  // send to linebot laf item
  // 落とし物が登録された時にLINEBotへメッセージを送信する
  // 今の時点では Hello World というメッセージが送信されるだけ。
  // あとLINE_USER_IDが固定になっている
  sendLafItemToLinebot(message: string) {
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    return client.pushMessage(this.configService.get<string>('LINE_USER_ID'), {
      type: 'text',
      text: message,
    });
  }
}
