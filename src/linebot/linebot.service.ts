import { Injectable } from '@nestjs/common';

@Injectable()
export class LinebotService {
  
  getHello(): void {
    const line = require('@line/bot-sdk');

    const client = new line.Client({
      channelAccessToken: 'vYu+1pZ92RwBbzU7NwqclBb+G5mgtA6colTF7s9zeMjp+crfBbRREmIIHFnyxMi8PNuDTX51XQpHk/hVN2QKU0OzP5zPWuOCroC/dVnsyr6YHfK6fGs17Tw8ondDY693ZtjaAd9VfwaG4K6lDIo73wdB04t89/1O/w1cDnyilFU='
    });

    const richmenu = {
      size: {
    width: 2500,
    height: 1686,
    },
    selected: false,
    name: "Nice richmenu",
    chatBarText: "Tap here",
  };

  client.createRichMenu(richmenu)
  .then((richMenuId) =>
  console.log(richMenuId))
}
}
