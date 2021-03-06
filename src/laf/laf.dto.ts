import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// 登録時に設定できるカテゴリ
export type ItemCategory =
  | 'wallet'
  | 'smartPhone'
  | 'waterBottle'
  | 'stationery'
  | 'key'
  | 'usb'
  | 'textbook/notebook/file'
  | 'earphone'
  | 'calculator'
  | 'umbrella'
  | 'clothing'
  | 'others';

// 登録時に設定できるカラータイプ
export type ColorType =
  | '#FFFFFF'
  | '#02331B'
  | '#999999'
  | '#FF2323'
  | '#FF3399'
  | '#FF33FF'
  | '#9933FF'
  | '#3333FF'
  | '#3399FF'
  | '#33FFFF'
  | '#33FF33'
  | '#99FF33'
  | '#FFFF33'
  | '#FF9933';

export function CategoryConversion(category: ItemCategory) {
  switch (category) {
    case 'wallet':
      return '財布';
      break;
    case 'smartPhone':
      return 'スマホ';
      break;
    case 'waterBottle':
      return '水筒';
      break;
    case 'stationery':
      return '文房具';
      break;
    case 'key':
      return '鍵';
      break;
    case 'usb':
      return 'USBメモリ';
      break;
    case 'textbook/notebook/file':
      return '教科書・ノート・ファイル';
      break;
    case 'earphone':
      return 'イヤホン';
      break;
    case 'calculator':
      return '電卓';
      break;
    case 'umbrella':
      return '傘';
      break;
    case 'clothing':
      return '衣料品';
      break;
    case 'others':
      return 'その他';
      break;
  }
}

export class LafItem {
  @ApiProperty()
  item_id: string;

  @ApiProperty()
  category: ItemCategory;

  @ApiProperty()
  color: ColorType;

  @ApiProperty()
  detail: string | null;

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
        color: '#FFFFFF',
        detail: null,
        image_url:
          'https://pbs.twimg.com/profile_images/1425448503010988032/p8GuVmXX_400x400.jpg',
        created_at: '2021-12-06T16:34:21.423Z',
      },
      {
        item_id: '20211205170917500',
        category: 'clothing',
        color: '#999999',
        detail: 'スポーツタオル',
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

  @ApiProperty({ type: String, example: '#FF33FF' })
  color: string;

  @ApiProperty({ type: String, example: 'スポーツタオル' })
  detail: string;

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

  @ApiProperty({ example: '#FF33FF' })
  @IsNotEmpty()
  color: ColorType;

  @ApiProperty({ required: false, example: 'スポーツタオル' })
  detail: string;

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
