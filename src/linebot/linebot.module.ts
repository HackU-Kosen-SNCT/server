import { Module } from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { LinebotController } from './linebot.controller';
import { LinebotConfigService } from 'src/config/linebot-config.service';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Laf } from 'src/laf/laf.entity';
import { LafModule } from 'src/laf/laf.module';
import { LinebotLafService } from 'src/laf/linebot-laf.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Laf]), LafModule],
  providers: [
    LinebotService,
    LinebotConfigService,
    UserService,
    LinebotLafService,
  ],
  controllers: [LinebotController],
})
export class LinebotModule {}
