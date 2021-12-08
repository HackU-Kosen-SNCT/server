import { Module ,MiddlewareConsumer} from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { LinebotController } from './linebot.controller';
import { middleware, MiddlewareConfig } from '@line/bot-sdk';


@Module({
  providers: [LinebotService],
  controllers: [LinebotController],
})
export class LinebotModule {}
