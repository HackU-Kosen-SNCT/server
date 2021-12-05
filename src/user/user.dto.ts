import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// ユーザーが設定できるカテゴリ
export type UserCategory =
  | 'valuables'
  | 'stationery'
  | 'clothing'
  | 'others'
  | 'unset';

export class UpdateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  registrant: string;

  @ApiProperty()
  @IsNotEmpty()
  searching_category: UserCategory;
}
