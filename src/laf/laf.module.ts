import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinebotConfigService } from 'src/config/linebot-config.service';
import { LinebotService } from 'src/linebot/linebot.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { LafController } from './laf.controller';
import { Laf } from './laf.entity';
import { LafService } from './laf.service';
import { LinebotLafService } from './linebot-laf.service';

@Module({
  imports: [TypeOrmModule.forFeature([Laf, User])],
  providers: [
    LafService,
    LinebotService,
    LinebotConfigService,
    UserService,
    LinebotLafService,
  ],
  controllers: [LafController],
})
export class LafModule {}
