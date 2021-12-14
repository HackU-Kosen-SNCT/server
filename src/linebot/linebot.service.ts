import { Injectable } from '@nestjs/common';
import { Client, FlexBubble, FlexMessage, PostbackEvent } from '@line/bot-sdk';
import { LinebotConfigService } from 'src/config/linebot-config.service';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { richMenu, UpdateQuickReply } from './linebot.data';
import { UserCategory } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { CategoryConversion } from 'src/laf/laf.dto';
import { Laf } from 'src/laf/laf.entity';
import { LinebotLafService } from 'src/laf/linebot-laf.service';
import { text } from 'stream/consumers';

@Injectable()
export class LinebotService {
  constructor(
    private configService: ConfigService,
    private linebotConfigService: LinebotConfigService,
    private userService: UserService,
    private linebotLafService: LinebotLafService,
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
  // searching_category === postされたcategoryの人全員に送る
  sendLafItemToLinebot(userIds: string[], item: Laf) {
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    // TODO: textではなくflex message返すように修正
    if (userIds.length === 0) return;
    return client.multicast(userIds, [
      {
        type: 'text',
        text: '新着の落とし物があります',
      },
      this.createFlexMessage([item]),
    ]);
  }

  // send to linebot laf items
  // ユーザーがこれを落としたと登録したときに直近に登録された落とし物を送信する
  sendLafItemsToLinebot(userId: string, items: Laf[]) {
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    // TODO: textではなくflex message返すように修正
    return client.pushMessage(userId, this.createFlexMessage(items));
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
        type: 'text',
        text: 'この落とし物が持ち主の元へ戻りました',
      },
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

    if (user.searching_category !== 'unset') {
      const items: Laf[] =
        await this.linebotLafService.getLafItemInThePastWeekByCategory(
          user.searching_category,
        );
      if (items.length === 0) {
        // ここ1週間、そのカテゴリのアイテムが届いていなかった時
        return client.replyMessage(replyToken, [
          {
            type: 'text',
            text: returnText,
          },
          {
            type: 'text',
            text: 'ここ1週間では落とし物は届いていません',
          },
        ]);
      } else {
        // ここ1週間で落とし物が届いている時
        return client.replyMessage(replyToken, [
          {
            type: 'text',
            text: returnText,
          },
          {
            type: 'text',
            text: `ここ1週間で${items.length}件の落とし物が届けられています`,
          },
          this.createFlexMessage(items),
        ]);
      }
    }
    return client.replyMessage(replyToken, {
      type: 'text',
      text: returnText,
    });
  }

  // リッチメニューの登録
  async SettingRichMenu() {
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    const richMenuId = await client.createRichMenu(richMenu);
    await client.setRichMenuImage(
      richMenuId,
      fs.createReadStream('src/linebot/richmenu.png'),
    );
    await client.setDefaultRichMenu(richMenuId);
    await client.createRichMenu(richMenu);
  }

  createFlexMessage(items: Laf[]) {
    const flexMessage: FlexMessage = {
      type: 'flex',
      altText: '画像一覧',
      contents: {
        type: 'carousel',
        contents: items.map((item) => this.createFlexBubble(item)),
      },
    };
    return flexMessage;
  }

  createFlexBubble(item: Laf): FlexBubble {
    const flexBubble: FlexBubble = {
      type: 'bubble',
      size: 'micro',
      hero: {
        type: 'image',
        url: item.image_url,
        size: 'full',
        margin: 'none',
        position: 'relative',
        flex: 1,
        backgroundColor: '#000000',
        aspectMode: 'cover',
        //画像のアスペクト比　デフォルトは1:1
        aspectRatio: "1.4:1"
      },
      body: {
        type: 'box',
        layout: 'baseline',
        contents: [
          {
            type: 'text',
            text: CategoryConversion(item.category),
            margin: 'none',
            weight: 'regular',
            position: 'relative',
            align: 'center',
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            //ここのtextを説明文に置き換える
            text: "This is test text",
            wrap: true,
            //表示する最大行数
            maxLines: 4,
            size: "xs",
          },
        ],
      }
    };
    return flexBubble;
  }

}

