import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// 登録時に設定できるカテゴリ
export type ItemCategory = 'valuables' | 'stationery' | 'clothing' | 'others';

export class LafItem {
  @ApiProperty()
  item_id: string;

  @ApiProperty()
  category: ItemCategory;

  @ApiProperty()
  detail: string | null;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  image_url: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  received_at: Date | null;
}

export class GetLafItemsResponse {
  @ApiProperty({
    type: [LafItem],
    example: [
      {
        item_id: '20211201152512300',
        category: 'others',
        detail: null,
        latitude: 36.82722,
        longitude: 84.28292,
        image_url:
          'https://pbs.twimg.com/profile_images/1425448503010988032/p8GuVmXX_400x400.jpg',
        created_at: '2021-12-06T16:34:21.423Z',
      },
      {
        item_id: '20211205170917500',
        category: 'clothing',
        detail: 'スポーツタオル',
        latitude: 82.28422,
        longitude: 78.28292,
        image_url:
          'https://pbs.twimg.com/profile_images/1425448503010988032/p8GuVmXX_400x400.jpg',
        created_at: '2021-12-07T06:32:19.329Z',
      },
    ],
  })
  items: LafItem[];
}

export class PostLafItemResponse {
  @ApiProperty({ type: String, example: '20211205170917500' })
  item_id: string;

  @ApiProperty({ type: String, example: 'clothing' })
  category: string;

  @ApiProperty({ type: String, example: 'スポーツタオル' })
  detail: string;

  @ApiProperty({ type: Number, example: 82.28422 })
  latitude: number;

  @ApiProperty({ type: Number, example: 78.28292 })
  longitude: number;

  @ApiProperty({
    type: String,
    example:
      'https://pbs.twimg.com/profile_images/1425448503010988032/p8GuVmXX_400x400.jpg',
  })
  image_url: string;

  @ApiProperty({ type: Date, example: '2021-12-06T16:34:21.423Z' })
  created_at: Date;
}

export class CreateLafItemDto {
  @ApiProperty({ example: '20211205170917500' })
  @IsNotEmpty()
  item_id: string;

  @ApiProperty({ example: 'clothing' })
  @IsNotEmpty()
  category: ItemCategory;

  @ApiProperty({ required: false, example: 'スポーツタオル' })
  detail: string;

  @ApiProperty({ example: 82.28422 })
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ example: 78.28292 })
  @IsNotEmpty()
  longitude: number;

  @ApiProperty({
    example:
      'https://pbs.twimg.com/profile_images/1425448503010988032/p8GuVmXX_400x400.jpg',
  })
  @IsNotEmpty()
  image_url: string;

  @ApiProperty({ example: '2021-12-06T16:34:21.423Z' })
  @IsNotEmpty()
  created_at: Date;
}

export class RegistrantDto {
  @ApiProperty({ example: '20211205170917500' })
  @IsNotEmpty()
  item_id: string;

  @ApiProperty({ example: '9ak2982ntj' })
  @IsNotEmpty()
  registrant: string;
}

export class ReceiveDto {
  @ApiProperty({ example: '20211205170917500' })
  @IsNotEmpty()
  item_id: string;

  @ApiProperty({ example: 'ありがとうございました！' })
  @IsNotEmpty()
  message: string;

  @ApiProperty({ example: '2021-12-06T16:34:21.423Z' })
  @IsNotEmpty()
  received_at: Date;
}
