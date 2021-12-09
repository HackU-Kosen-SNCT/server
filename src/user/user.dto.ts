import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// ユーザーが設定できるカテゴリ
export type UserCategory =
  | 'wallet'
  | 'smartPhone'
  | 'waterBottle'
  | 'stationery'
  | 'key'
  | 'usb'
  | 'textbook'
  | 'notebook/file'
  | 'earphone'
  | 'calculator'
  | 'umbrella'
  | 'clothing'
  | 'others'
  | 'unset';

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
