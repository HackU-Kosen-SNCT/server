import { Controller, Get } from '@nestjs/common';

@Controller('laf')
export class LafController {
  @Get()
  hello() {
    return 'Hello World';
  }
}
