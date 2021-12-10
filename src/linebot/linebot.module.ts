import { Module } from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { LinebotController } from './linebot.controller';
import { LinebotConfigService } from 'src/config/linebot-config.service';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [LinebotService, LinebotConfigService, UserService],
  controllers: [LinebotController],
})
export class LinebotModule {}
