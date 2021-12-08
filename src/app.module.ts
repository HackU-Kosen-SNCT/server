import { Module , MiddlewareConsumer} from '@nestjs/common';
import { ConfigModule , ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { LafModule } from './laf/laf.module';
import { UserModule } from './user/user.module';
import { LinebotModule } from './linebot/linebot.module';
import { LinebotController } from './linebot/linebot.controller';
import { MiddlewareConfig, middleware } from '@line/bot-sdk';
import bodyparser = require('body-parser')


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
})
export class AppModule {
  //configure(consumer: MiddlewareConsumer) {
    
    //const configService = new ConfigService();

    //Linebotのアクセストークン
    //const lineConfig: MiddlewareConfig = {
    // channelAccessToken: configService.get('LINE_BOT_CHANNEL_TOKEN'),
    //  channelSecret: configService.get('LINE_BOT_CHANNEL_SECRET')
    //};

    //consumer
    //  .apply(middleware(lineConfig))
    //  .forRoutes(LinebotController);
    
    //consumer.apply(bodyparser.json(),bodyparser.urlencoded({ extended : false}));
  //}
}
