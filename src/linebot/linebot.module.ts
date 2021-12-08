import { Module } from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { LinebotController } from './linebot.controller';
import { LinebotConfigService } from 'src/config/linebot-config.service';

@Module({
  providers: [LinebotService, LinebotConfigService],
  controllers: [LinebotController],
})
export class LinebotModule {}
