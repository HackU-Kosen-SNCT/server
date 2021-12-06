import { Module ,MiddlewareConsumer} from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { LinebotController } from './linebot.controller';
import { middleware, MiddlewareConfig } from '@line/bot-sdk';

@Module({
  providers: [LinebotService],
  controllers: [LinebotController],
})
export class LinebotModule {
  configure(consumer: MiddlewareConsumer) {

    //Linebotのアクセストークン
    const lineConfig: MiddlewareConfig = {
      channelAccessToken: process.env.LINE_BOT_CHANNEL_TOKEN,
      channelSecret: process.env.LINE_BOT_CHANNEL_SECRET,
    };


    // config を指定して LINE SDK の middleware を指定する
    // 先にLinebot側のmiddlewareが働く必要があるため
    consumer
      .apply(middleware(lineConfig))
      .forRoutes(LinebotController);
  }
}
