import { Injectable } from '@nestjs/common';
import '@line/bot-sdk';
@Injectable()
export class LinebotService {
  getHello(): string {
    return 'Hello World!';
  }

  // send to linebot laf item
  // 落とし物が登録された時にLINEBotへメッセージを送信する
  sendLafItemToLinebot() {
    return 'message';
  }
}
