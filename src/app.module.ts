import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { LafModule } from './laf/laf.module';
import { UserModule } from './user/user.module';
import { LinebotModule } from './linebot/linebot.module';

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
export class AppModule {}
