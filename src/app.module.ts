import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { LafModule } from './laf/laf.module';
import { UserModule } from './user/user.module';
import { LinebotModule } from './linebot/linebot.module';
import { middleware as LineMiddleware } from '@line/bot-sdk';
import { LinebotController } from './linebot/linebot.controller';

import bodyParser = require('body-parser');
import { LinebotConfigService } from './config/linebot-config.service';
import { LafController } from './laf/laf.controller';

@Module({
  imports: [
    LafModule,
    UserModule,
    LinebotModule,
    ConfigModule.forRoot({
      envFilePath: [
        `.envfiles/${process.env.NODE_ENV}.env`,
        '.envfiles/default.env',
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  providers: [LinebotConfigService],
})
export class AppModule implements NestModule {
  constructor(readonly linebotConfigService: LinebotConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LineMiddleware(this.linebotConfigService.createLinebotOptions()))
      .forRoutes(LinebotController);
    consumer.apply(bodyParser.json()).forRoutes(LafController);
  }
}
