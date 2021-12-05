import { Module } from '@nestjs/common';
import { LinebotService } from './linebot.service';

@Module({
  providers: [LinebotService],
})
export class LinebotModule {}
