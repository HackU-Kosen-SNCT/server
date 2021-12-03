import { Module } from '@nestjs/common';
import { LafModule } from './laf/laf.module';

@Module({
  imports: [LafModule],
})
export class AppModule {}
