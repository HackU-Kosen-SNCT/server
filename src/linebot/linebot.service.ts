import { Injectable } from '@nestjs/common';
import '@line/bot-sdk';
import { Client } from '@line/bot-sdk';
import { LinebotConfigService } from 'src/config/linebot-config.service';
import { ConfigService } from '@nestjs/config';
import type { TemplateMessage } from '@line/bot-sdk';
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
  carouselMessage(): TemplateMessage {
    const message: TemplateMessage = {
      type: 'template',
      altText: 'cannot display template message',
      template: {
        type: 'carousel',
        columns: [
          {
            text: 'Hoge',
            title: 'Fuga',
            actions: [
              {
                type: 'uri',
                label: 'See Wikipedia',
                uri: 'https://ja.wikipedia.org/wiki/%E3%83%A1%E3%82%BF%E6%A7%8B%E6%96%87%E5%A4%89%E6%95%B0',
              },
            ],
          },
        ],
      },
    };
    return message;
  }
}
