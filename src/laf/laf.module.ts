import { Module } from '@nestjs/common';
import { LafController } from './laf.controller';
import { LafService } from './laf.service';

@Module({
  providers: [LafService],
  controllers: [LafController],
})
export class LafModule {}
