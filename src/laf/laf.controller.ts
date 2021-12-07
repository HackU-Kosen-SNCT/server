import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
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
    description:
      '必須のプロパティが空の時や既にitem_idが存在している場合に返されます',
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
  @ApiNoContentResponse({
    description: '成功時処理(未実装)',
  })
  @ApiBadRequestResponse({
    description: '必須のプロパティが空の時などに返す',
  })
  @ApiNotFoundResponse({
    description:
      'item_id, registrantに適切でない(存在しない)値が入っていた場合に返す',
  })
  @HttpCode(204)
  async registrant(@Body() registrantDto: RegistrantDto) {
    const item = await this.lafService.registrant(registrantDto);
    if (!item) {
      throw new NotFoundException('The item_id or registrant does not exist.');
    }
  }

  // TODO: Response Type
  @Patch('/receive')
  @ApiOperation({
    summary: 'メッセージの送信・落とし物の受け取り処理を行うAPI',
  })
  @ApiNoContentResponse({
    description: '成功時処理(未実装)',
  })
  @ApiBadRequestResponse({
    description: '必須のプロパティが空の時などに返す',
  })
  @ApiNotFoundResponse({
    description: 'item_idが存在しない場合に返す',
  })
  @HttpCode(204)
  async receive(@Body() receiveDto: ReceiveDto) {
    const item = await this.lafService.receive(receiveDto);
    if (!item) {
      throw new NotFoundException('The item_id does not exist.');
    }
  }
}
