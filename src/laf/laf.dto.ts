import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ItemCategory } from 'src/category.type';

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
        created_at: '2021-12-01 15:25:12',
      },
      {
        item_id: '20211205170917500',
        category: 'clothing',
        detail: 'スポーツタオル',
        latitude: 82.28422,
        longitude: 78.28292,
        image_url:
          'https://pbs.twimg.com/profile_images/1425448503010988032/p8GuVmXX_400x400.jpg',
        created_at: '2021-12-05 17:09:17',
      },
    ],
  })
  items: LafItem[];
}

export class PostLafItemResponse {
  @ApiProperty({
    type: LafItem,
    example: [
      {
        item_id: '20211205170917500',
        category: 'clothing',
        detail: 'スポーツタオル',
        latitude: 82.28422,
        longitude: 78.28292,
        image_url:
          'https://pbs.twimg.com/profile_images/1425448503010988032/p8GuVmXX_400x400.jpg',
        created_at: '2021-12-05 17:09:17',
      },
    ],
  })
  item: LafItem;
}

export class CreateLafItemDto {
  @ApiProperty()
  @IsNotEmpty()
  item_id: string;

  @ApiProperty()
  @IsNotEmpty()
  category: ItemCategory;

  @ApiProperty()
  detail: string;

  @ApiProperty()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty()
  @IsNotEmpty()
  image_url: string;

  @ApiProperty()
  @IsNotEmpty()
  created_at: Date;
}

export class RegistrantDto {
  @ApiProperty()
  @IsNotEmpty()
  item_id: string;

  @ApiProperty()
  @IsNotEmpty()
  registrant: string;
}

export class ReceiveDto {
  @ApiProperty()
  @IsNotEmpty()
  item_id: string;

  @ApiProperty()
  @IsNotEmpty()
  message: string;

  @ApiProperty()
  @IsNotEmpty()
  received_at: Date;
}
