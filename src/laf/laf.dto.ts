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
  @ApiProperty({ type: [LafItem] })
  items: LafItem[];
}

export class PostLafItemResponse {
  @ApiProperty({ type: LafItem })
  item: LafItem;
}

export class LafItemPropertyDto {
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
