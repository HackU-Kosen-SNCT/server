import { Injectable } from '@nestjs/common';
import type { TemplateMessage } from '@line/bot-sdk';
@Injectable()
export class LinebotService {
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
