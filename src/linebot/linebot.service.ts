import { Injectable } from '@nestjs/common';
import { Client, PostbackEvent, RichMenu } from '@line/bot-sdk';
import { LinebotConfigService } from 'src/config/linebot-config.service';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import type { TemplateMessage } from '@line/bot-sdk';
import { UpdateQuickReply } from './linebot.data';
import { UserCategory } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { CategoryConversion } from 'src/laf/laf.dto';

@Injectable()
export class LinebotService {
  constructor(
    private configService: ConfigService,
    private linebotConfigService: LinebotConfigService,
    private userService: UserService,
  ) {}

  postBackHandler(event: PostbackEvent) {
    switch (event.postback.data) {
      case 'update':
        // クイックリプライを返す
        this.updateCategoryQuickReply(event.replyToken);
        break;
      case event.postback.data as UserCategory:
        this.updateUserCategory(
          event.postback.data,
          event.source.userId,
          event.replyToken,
        );
        break;
      default:
        break;
    }
  }

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

  // 落としたものの更新イベント
  updateCategoryQuickReply(replyToken: string) {
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    return client.replyMessage(replyToken, {
      type: 'text',
      text: '落としたものの登録・変更をしてね。該当するものをタップしてください。',
      quickReply: {
        items: UpdateQuickReply,
      },
    });
  }

  // ユーザーの探しているものの変更
  async updateUserCategory(
    searching_category: UserCategory,
    registrant: string,
    replyToken: string,
  ) {
    const user = await this.userService.updateCategory({
      registrant,
      searching_category,
    });
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    const returnText =
      user.searching_category === 'unset'
        ? '登録を解除しました。'
        : `${CategoryConversion(
            user.searching_category,
          )}を落とした物として登録しました。`;

    // TODO: ここで一緒に直近の落とし物があれば一緒に返す
    return client.replyMessage(replyToken, {
      type: 'text',
      text: returnText,
    });
  }

  // リッチメニューの登録
  async SettingRichMenu() {
    const client = new Client(this.linebotConfigService.createLinebotOptions());

    const richMenu: RichMenu = {
      size: {
        width: 1200,
        height: 405,
      },
      selected: true,
      name: 'リッチメニュー 1',
      chatBarText: 'メニュー一覧',
      areas: [
        {
          bounds: {
            x: 0,
            y: 0,
            width: 600,
            height: 405,
          },
          action: {
            type: 'uri',
            uri: 'https://liff.line.me/1656701091-JxvpwXG2',
          },
        },
        {
          bounds: {
            x: 600,
            y: 0,
            width: 600,
            height: 405,
          },
          action: {
            type: 'postback',
            data: 'update',
          },
        },
      ],
    };

    const richMenuId = await client.createRichMenu(richMenu);
    await client.setRichMenuImage(
      richMenuId,
      fs.createReadStream('src/linebot/richmenu.png'),
    );
    await client.setDefaultRichMenu(richMenuId);

    await client
      .createRichMenu(richMenu)
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
