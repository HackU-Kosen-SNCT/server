import { Controller, Get, Post } from '@nestjs/common';

@Controller('laf')
export class LafController {
  @Get()
  getLafItems() {
    return '';
  }

  @Post()
  createLafItem() {
    return '';
  }

  @Post('/registrant')
  registrant() {
    return '';
  }

  @Post('/receive')
  receive() {
    return '';
  }
}
