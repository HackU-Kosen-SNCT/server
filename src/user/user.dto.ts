import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ItemCategory } from 'src/laf/laf.dto';

// ユーザーが設定できるカテゴリ
export type UserCategory = ItemCategory | 'unset';

export class UpdateCategoryDto {
  @ApiProperty({ example: '9ak2982ntj' })
  @IsNotEmpty()
  registrant: string;

  @ApiProperty({ example: 'others' })
  @IsNotEmpty()
  searching_category: UserCategory;
}

export class UpdateCategoryResponse {
  @ApiProperty({
    type: String,
    example: '9ak2982ntj',
  })
  registrant: string;

  @ApiProperty({
    type: String,
    example: 'others',
  })
  searching_category: string;
}
