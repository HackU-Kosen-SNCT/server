import { Module } from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { LinebotController } from './linebot.controller';

@Module({
  providers: [LinebotService],
  controllers: [LinebotController],
})
export class LinebotModule {}
