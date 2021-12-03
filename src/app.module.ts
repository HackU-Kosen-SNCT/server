import { Module } from '@nestjs/common';
import { LafModule } from './laf/laf.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [LafModule, UserModule],
})
export class AppModule {}
