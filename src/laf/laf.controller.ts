import { Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetLafItemsResponse } from './laf.dto';

@Controller('laf')
export class LafController {
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetLafItemsResponse,
    description: '落とし物を全件取得するAPI',
  })
  getLafItems(): GetLafItemsResponse {
    return { items: [] };
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
