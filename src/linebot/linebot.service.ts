import { Injectable } from '@nestjs/common';
import * as line from '@line/bot-sdk';
import { Client , RichMenu} from '@line/bot-sdk';
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

  SettingrichMenu() : void {

  const client = new line.Client({
    channelAccessToken: 'vYu+1pZ92RwBbzU7NwqclBb+G5mgtA6colTF7s9zeMjp+crfBbRREmIIHFnyxMi8PNuDTX51XQpHk/hVN2QKU0OzP5zPWuOCroC/dVnsyr6YHfK6fGs17Tw8ondDY693ZtjaAd9VfwaG4K6lDIo73wdB04t89/1O/w1cDnyilFU='
  });

  const richmenu : RichMenu= {
    size: {
      width: 2500,
      height: 1686
    },
    selected: false,
    name: "Nice richmenu",
    chatBarText: "Tap to open",
    areas:[ 
      {
        bounds: {
          x: 0,
          y: 0,
          width: 2500,
          height: 1686
        },
        action: {
          type: "postback",
          data: "action=buy&itemid=123"
        }
      }
    ]
  };

  client.createRichMenu(richmenu)
    .then((richMenuId : any) =>
    console.log(richMenuId))
}
}

