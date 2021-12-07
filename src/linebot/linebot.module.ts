import { Module ,MiddlewareConsumer} from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { LinebotController } from './linebot.controller';
import { middleware, MiddlewareConfig } from '@line/bot-sdk';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [LinebotService],
  controllers: [LinebotController],
})
export class LinebotModule {
  configure(consumer: MiddlewareConsumer) {

    const configService = new ConfigService();

    //Linebotのアクセストークン
    const lineConfig: MiddlewareConfig = {
      channelAccessToken: configService.get('LINE_BOT_CHANNEL_TOKEN'),
      channelSecret: configService.get('LINE_BOT_CHANNEL_SECRET')
    };


    // config を指定して LINE SDK の middleware を指定する
    // 先にLinebot側のmiddlewareが働く必要があるため
    consumer
      .apply(middleware(lineConfig))
      .forRoutes(LinebotController);
  }
}
