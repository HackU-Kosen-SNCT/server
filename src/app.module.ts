import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LafModule } from './laf/laf.module';

@Module({
  imports: [LafModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
