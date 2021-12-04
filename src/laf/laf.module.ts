import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LafController } from './laf.controller';
import { Laf } from './laf.entity';
import { LafService } from './laf.service';

@Module({
  imports: [TypeOrmModule.forFeature([Laf])],
  providers: [LafService],
  controllers: [LafController],
})
export class LafModule {}
