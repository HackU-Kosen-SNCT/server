import { Injectable } from '@nestjs/common';
import { Client, RichMenu } from '@line/bot-sdk';
import { LinebotConfigService } from 'src/config/linebot-config.service';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
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
  // 今の時点では Hello World というメッセージが送信されるだけ。
  // あとLINE_USER_IDが固定になっている
  sendLafItemToLinebot(message: string) {
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    return client.pushMessage(this.configService.get<string>('LINE_USER_ID'), {
      type: 'text',
      text: message,
    });
  }

  sendFlexMessage_test(){
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    return client.pushMessage(this.configService.get<string>('LINE_USER_ID'), {
      "type": "flex",
      "altText": "This is a Flex Message",
      "contents": {
          "type": "carousel",
          "contents": [
            {
              "type": "bubble",
              "size": "micro",
              "hero": {
                "type": "image",
                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                "size": "xxl",
                "margin": "none",
                "position": "relative",
                "flex": 1,
                "backgroundColor": "#000000",
                "aspectMode": "cover"
              },
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "カテゴリ",
                    "margin": "none",
                    "weight": "regular",
                    "position": "relative",
                    "align": "center"
                  },
                  {
                    "type": "text",
                    "text": "時間",
                    "margin": "md",
                    "size": "xs"
                  }
                ]
              }
            },
            {
              "type": "bubble",
              "size": "micro",
              "hero": {
                "type": "image",
                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                "size": "full",
                "flex": 2,
                "position": "relative",
                "aspectMode": "cover"
              }
            },
            {
            "type": "bubble",
              "size": "micro",
              "hero": {
                "type": "image",
                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                "size": "xxl",
                "margin": "none",
                "position": "relative",
                "flex": 1,
                "backgroundColor": "#000000",
                "aspectMode": "cover"
              },
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "カテゴリ",
                    "margin": "none",
                    "weight": "regular",
                    "position": "relative",
                    "align": "center"
                  },
                  {
                    "type": "text",
                    "text": "時間",
                    "margin": "md",
                    "size": "xs"
                  }
                ]
              }
            },
          ]
        }
      })
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
      
}


  // 感謝のメッセージを送信する
  // 今はmessageだけだけど、この落とし物が届いたってわかるためには登録した写真とかも返してあげる？
  sendTheMessageOfThanks(message: string, registrant: string) {
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    return client.pushMessage(registrant, {
      type: 'text',
      text: message,
    });
  }
}
