import { Injectable } from '@nestjs/common';
import { Client, RichMenu } from '@line/bot-sdk';
import { LinebotConfigService } from 'src/config/linebot-config.service';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import type { TemplateMessage } from '@line/bot-sdk';

@Injectable()
export class LinebotService {
  constructor(
    private configService: ConfigService,
    private linebotConfigService: LinebotConfigService,
  ) {}

  // send to linebot laf item
  // 落とし物が登録された時にLINEBotへメッセージを送信する
  sendLafItemToLinebot(userIds: string[]) {
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    // TODO: textではなくflex message返すように修正
    return client.multicast(userIds, {
      type: 'text',
      text: 'hello',
    });
  }

  // send to linebot laf items
  // ユーザーがこれを落としたと登録したときに直近に登録された落とし物を送信する
  sendLafItemsToLinebot(userId: string) {
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    // TODO: textではなくflex message返すように修正
    return client.pushMessage(userId, {
      type: 'text',
      text: 'hello',
    });
  }

  // 感謝のメッセージを送信する
  // 今はmessageだけだけど、この落とし物が届いたってわかるためには登録した写真とかも返してあげる？
  sendTheMessageOfThanks(
    message: string,
    registrant: string,
    imageUrl: string,
  ) {
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    return client.pushMessage(registrant, [
      {
        type: 'image',
        originalContentUrl: imageUrl,
        previewImageUrl: imageUrl,
      },
      {
        type: 'text',
        text: message,
      },
    ]);
  }

  async SettingrichMenu() {
    const client = new Client(this.linebotConfigService.createLinebotOptions());

    const richmenu: RichMenu = {
      size: {
        width: 2500,
        height: 1686,
      },
      selected: true,
      name: 'リッチメニュー 1',
      chatBarText: 'メニュー一覧',
      areas: [
        {
          bounds: {
            x: 0,
            y: 0,
            width: 1250,
            height: 843,
          },
          action: {
            type: 'uri',
            uri: 'https://liff.line.me/1656701091-JxvpwXG2',
          },
        },
      ],
    };

    const richMenuId = await client.createRichMenu(richmenu);
    await client.setRichMenuImage(
      richMenuId,
      fs.createReadStream('src/linebot/rich.jpg'),
    );
    await client.setDefaultRichMenu(richMenuId);

    await client
      .createRichMenu(richmenu)
      .then((richMenuId: any) => console.log(richMenuId));
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
          {
            text: 'foo',
            title: 'bar',
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
