import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateCategoryPipe } from './create-category.pipe';
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
  @ApiCreatedResponse({
    type: PostLafItemResponse,
    description: '成功時処理',
  })
  @ApiBadRequestResponse({
    description: 'category等の値が適切ではない場合に返されます(未実装)',
  })
  async createLafItem(
    @Body(CreateCategoryPipe) createLafItemDto: CreateLafItemDto,
  ): Promise<LafItem> {
    const item = await this.lafService.createLafItem(createLafItemDto);
    if (!item) {
      throw new BadRequestException(
        'An item with the same item_id has already been registered.',
      );
    }
    return item;
  }

  // TODO: Response Type
  @Patch('/registrant')
  @ApiOperation({ summary: '落とし物の登録者を設定するAPI' })
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
    return ApiNoContentResponse;
  }
}
