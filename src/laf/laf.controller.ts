import { Body, Controller, Get, HttpCode, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: '登録された落とし物を全件取得するAPI' })
  @ApiOkResponse({
    type: GetLafItemsResponse,
    description: '成功時処理',
  })
  @ApiInternalServerErrorResponse({
    description: 'サーバー側エラー時のレスポンス',
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
  @HttpCode(201)
  @ApiOperation({ summary: '落とし物を登録するAPI' })
  @ApiParam({
    name: 'created_at',
    required: true,
    description: '登録時刻',
  })
  @ApiParam({
    name: 'image_url',
    required: true,
    description: '画像URL',
  })
  @ApiParam({
    name: 'longitude',
    required: true,
    description: '座標',
  })
  @ApiParam({
    name: 'latitude',
    required: true,
    description: '座標',
  })
  @ApiParam({
    name: 'detail',
    required: false,
    description: '詳しい場所などの詳細情報',
  })
  @ApiParam({
    name: 'category',
    required: true,
    description: '落とし物のカテゴリ',
  })
  @ApiParam({
    name: 'item_id',
    required: true,
    description: '登録された落とし物のID',
  })
  @ApiCreatedResponse({
    type: PostLafItemResponse,
    description: '成功時処理',
  })
  @ApiBadRequestResponse({
    description: 'category等の値が適切ではない場合に返されます(未実装)',
  })
  createLafItem(@Body() createLafItemDto: CreateLafItemDto): Promise<LafItem> {
    return this.lafService.createLafItem(createLafItemDto);
  }

  // TODO: Response Type
  @Patch('/registrant')
  @ApiOperation({ summary: '落とし物の登録者を設定するAPI' })
  @ApiParam({
    name: 'registrant',
    required: true,
    description: '落とし物の登録者のID',
  })
  @ApiParam({
    name: 'item_id',
    required: true,
    description: '落とし物のID',
  })
  @ApiOkResponse({
    description: '成功時処理(未実装)',
  })
  @ApiNotFoundResponse({
    description:
      'item_id, registrantに適切でない(存在しない)値が入っていた場合に返す(未実装)',
  })
  registrant(@Body() registrantDto: RegistrantDto) {
    // TODO: registrant(LINEのuser_id)の値が存在するかのチェックもいるかも
    this.lafService.registrant(registrantDto);
  }

  // TODO: Response Type
  @Patch('/receive')
  @ApiOperation({
    summary: 'メッセージの送信・落とし物の受け取り処理を行うAPI',
  })
  @ApiParam({
    name: 'received_at',
    required: true,
    description: '受け取った時刻',
  })
  @ApiParam({
    name: 'message',
    required: true,
    description: '受け取った時に入力する感謝のメッセージ',
  })
  @ApiParam({
    name: 'item_id',
    required: true,
    description: '落とし物のID',
  })
  @ApiOkResponse({
    description: '成功時処理(未実装)',
  })
  @ApiBadRequestResponse({
    description: 'messageが空の時などに返す(未実装)',
  })
  @ApiNotFoundResponse({
    description: 'item_idが存在しない場合に返す(未実装)',
  })
  receive(@Body() receiveDto: ReceiveDto) {
    this.lafService.receive(receiveDto);
  }
}
