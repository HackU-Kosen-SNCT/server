import { Body, Controller, Get, HttpStatus, Patch, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  GetLafItemsResponse,
  LafItem,
  CreateLafItemDto,
  PostLafItemResponse,
  RegistrantDto,
  ReceiveDto,
} from './laf.dto';
import { LafService } from './laf.service';

@Controller('laf')
export class LafController {
  constructor(private lafService: LafService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetLafItemsResponse,
    description: '落とし物を全件取得するAPI',
  })
  async getLafItems(): Promise<LafItem[]> {
    const items = await this.lafService.getLafItems();
    return items.map((item) => {
      delete item.message;
      delete item.registrant;
      return item;
    });
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PostLafItemResponse,
    description: '落とし物を登録するAPI',
  })
  createLafItem(@Body() createLafItemDto: CreateLafItemDto): Promise<LafItem> {
    return this.lafService.createLafItem(createLafItemDto);
  }

  @Patch('/registrant')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: '登録者を設定するAPI',
  })
  registrant(@Body() registrantDto: RegistrantDto) {
    // TODO: registrant(LINEのuser_id)の値が存在するかのチェックもいるかも
    this.lafService.registrant(registrantDto);
  }

  @Patch('/receive')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'メッセージの送信、受け取りの確認を行うAPI',
  })
  receive(@Body() receiveDto: ReceiveDto) {
    this.lafService.receive(receiveDto);
  }
}
